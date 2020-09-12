const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoDB = require("./config/db.js");
const cors = require("cors");
const path = require("path");
const config = require("config");
const mongoose = require('mongoose');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const gemshire = require("./main.js"); 
const rp = require("request-promise"); 
const { v4: uuidv4 } = require('uuid');
const nodeAddress = uuidv4().split("-").join("");
const paypal = require('paypal-rest-sdk');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
mongoDB();

paypal.configure({
	'mode': 'sandbox', //sandbox or live
	'client_id': 'AatWS7bPUsaanCxASstt_DROXJgWESP5-qDnlAwM_J0JFp596UlChQvchiHwH6AU6oIEDVbJKunHu5pX',
	'client_secret': 'EGNFNDTQg9SNZcnYLQG10A73TQaH9DLVaYwMuLyev8o0r8nC4zKGEeE_WFGTZnRb5jwPQPxP2DursFDz'
});

app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({
	extended: true
})); 

// routes go here... 
app.use("/register", require("./routes/auth/register.js"));
app.use("/login", require("./routes/auth/sign-in.js"));
app.use("/gather/specific/user/username", require("./routes/specific/getUserByUsername.js"));
app.use("/upload/new/profile/picture", require("./routes/profile/pictures/uploadNewPicture.js"));
app.use("/update/profile/main/info", require("./routes/profile/settings-data/basic/changeBasicInfomation.js"));
app.use("/check/email/taken", require("./routes/validate-accounts/checkEmailTaken.js"));
app.use("/update/hourly/pay", require("./routes/profile/settings-data/rates-files-skills/index.js"));
app.use("/update/skills/profile", require("./routes/profile/settings-data/basic/updateSkills.js"));
app.use("/upload/resume/profile", require("./routes/profile/file-uploads/uploadResume.js"));
app.use("/upload/profile/data/introduction", require("./routes/profile/settings-data/basic/uploadIntroduction.js"));
app.use("/upload/profile/data/nationality", require("./routes/profile/settings-data/basic/uploadNationality.js"));
app.use("/upload/profile/data/tagline", require("./routes/profile/settings-data/basic/updateTagline.js"));
app.use("/create/profile/update/page/one", require("./routes/profile/signup/pageOne.js"));
app.use("/figure/out/page/number", require("./routes/pageNumber.js"));
app.use("/create/profile/update/expertise/level", require("./routes/profile/signup/expertiseLevel.js"));

app.get("/blockchain", (req, res) => {
	res.send(gemshire);
  });
  
app.post("/receive-new-block", (req, res) => {
	const { newBlock } = req.body;
	const lastBlock = gemshire.getLastBlock();

	const correctHash = lastBlock.hash === newBlock.previousBlockHash;
	const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

	if (correctHash && correctIndex) {
		gemshire.chain.push(newBlock);
		gemshire.pendingTransactions = [];
		res.json({
		note: "New block received and accepted.",
		newBlock
		})
	} else {
		res.json({
		note: "New block rejected.",
		newBlock
		})
	}

})

app.get("/mine", (req, res) => {

	const lastBlock = gemshire.getLastBlock();

	const previousBlockHash = lastBlock["hash"];

	const currentBlockData = {
		transactions: gemshire.pendingTransactions,
		index: lastBlock["index"] + 1
	}

	const nounce = gemshire.proofOfWork(previousBlockHash, currentBlockData);
	
	const blockHash = gemshire.hashBlock(previousBlockHash, currentBlockData, nounce);

	const newBlock = gemshire.createNewBlock(nounce, previousBlockHash, blockHash);

	const requestPromises = [];

	gemshire.networkNodes.forEach((networkNodeUrl) => {
		const requestOptions = {
		uri: networkNodeUrl + "/receive-new-block",
		method: "POST",
		body: { newBlock },
		json: true
		};

		requestPromises.push(rp(requestOptions));
	})

	Promise.all(requestPromises).then((data) => {
		const requestOptions = {
		uri: gemshire.currentNodeUrl + "/transaction/broadcast",
		method: "POST",
		body: {
			amount: 12.5,
			sender: "00",
			recipient: nodeAddress
		},
		json: true
		}

		return rp(requestOptions);
	}).then((data) => {
		res.json({
			note: "New block mined successfully",
			block: newBlock
		})
	})
});

app.get("/consensus", (req, res) => {
	const requestPromises = [];

	gemshire.networkNodes.forEach((networkNodeUrl) => {
		const requestOptions = { 
		uri: networkNodeUrl + "/blockchain",
		method: "GET",
		json: true
		};
		requestPromises.push(rp(requestOptions));
	});
	Promise.all(requestPromises).then((blockchains) => {
		const currentChainLength = gemshire.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingTransactions = null;
		
		blockchains.forEach((blockchain) => {
		if (blockchain.chain.length > maxChainLength) {
			maxChainLength = blockchain.chain.length;
			newLongestChain = blockchain.chain;
			newPendingTransactions = blockchain.pendingTransactions;
		}
		});

		if (!newLongestChain || (newLongestChain && !gemshire.chainIsValid(newLongestChain))) {
			res.json({
				note: "Current chain has not been replaced.",
				chain: gemshire.chain
			})
		} else if (newLongestChain && gemshire.chainIsValid(newLongestChain)) {
			gemshire.chain = newLongestChain;
			gemshire.pendingTransactions = newPendingTransactions;
			res.json({
				note: "This chain has been replaced",
				chain: gemshire.chain
			})
		}
	});
});

// register a node and broadcast to network
app.post("/register-and-broadcast-node", (req, res) => {
	const { newNodeUrl } = req.body;

	if (gemshire.networkNodes.indexOf(newNodeUrl) == -1 && gemshire.currentNodeUrl !== newNodeUrl) {
		console.log("ran 3");
		gemshire.networkNodes.push(newNodeUrl);
	}
	const regNodesPromises = [];
	gemshire.networkNodes.forEach((networkNodeUrl) => {
		const requestOptions = {
		uri: networkNodeUrl + "/register-node",
		method: "POST",
		body: { newNodeUrl: newNodeUrl },
		json: true
		}
		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises).then((data) => {
		// do operations
		const bulkRegisterOptions = {
			uri: newNodeUrl + "/register-nodes-bulk",
			method: "POST",
			body: { allNetworkNodes: [...gemshire.networkNodes, gemshire.currentNodeUrl] },
			json: true
		};

		return rp(bulkRegisterOptions);
	}).then((data) => {
		console.log("DATA :", data);
		res.json({ note: data.note })
	});
});
// register node with the network
app.post("/register-node", (req, res) => {
	console.log("req.body.newNodeUrl", req.body.newNodeUrl, gemshire.currentNodeUrl);
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = gemshire.networkNodes.indexOf(newNodeUrl) === -1;
	const notCurrentNode = gemshire.currentNodeUrl === newNodeUrl;

	if (nodeNotAlreadyPresent && !notCurrentNode) {
		console.log("ran 1");
		gemshire.networkNodes.push(newNodeUrl);
	}
	res.json({
		note: "New node registered successfully."
	})
});
app.post("/transaction", (req, res) => {
	const newTransaction = req.body;

	const blockIndex = gemshire.addTransactionToPendingTransactions(newTransaction);

	res.json({
		note: `Transaction will be added in block ${blockIndex}`
	})
})
app.post('/transaction/broadcast', (req, res) => {
	const { amount, sender, recipient } = req.body;

	const newTransaction = gemshire.createNewTransaction(amount, sender, recipient);

	gemshire.addTransactionToPendingTransactions(newTransaction);

	const requestPromises = [];

	gemshire.networkNodes.forEach((networkNodeUrl) => {
		const requestOptions = {
			uri: networkNodeUrl + "/transaction",
			method: "POST",
			body: newTransaction,
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises).then((data) => {
		res.json({
		note: "Transaction created and broadcasted successfully."
		})
	})
});
// register multiple nodes at once
app.post("/register-nodes-bulk", (req, res) => {
	const allNetworkNodes = req.body.allNetworkNodes;

	allNetworkNodes.forEach((networkNodeUrl) => {
			console.log("allNetworkNodes", allNetworkNodes);
			const nodeNotAlreadyPresent = gemshire.networkNodes.indexOf(networkNodeUrl) == -1;
			const notCurrentNode = gemshire.currentNodeUrl !== networkNodeUrl;
			if (nodeNotAlreadyPresent && notCurrentNode) {
				console.log("Ran 2");
				gemshire.networkNodes.push(networkNodeUrl);
			}
	});
	res.json({
		note: "Bulk registration successful."
	}) 
});

app.get("/block/:blockHash", (req, res) => {
	const blockHash = req.params.blockHash;
	const correctBlock = gemshire.getBlock(blockHash);
	res.json({
		block: correctBlock
	})
});

app.get("/transaction/:transactionId", (req, res) => {
	const transactionId = req.params.transactionId;

	const transactionData = gemshire.getTransaction(transactionId);

	res.json({
		transaction: transactionData.transaction,
		block: transactionData.block
	})
});

app.get("/address/:address", (req, res) => {
	const address = req.params.address;
	const addressData = gemshire.getAddressData(address);

	res.json({
		addressData
	})
});

app.get('*', cors(), function(_, res) {
  res.sendFile(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    };
  };
});

app.get('/*', cors(), function(_, res) {
  res.sendFile(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    };
  }; 
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if fit doenst recognize the route
	app.get('*', cors(), function(_, res) {
	  res.sendFile(__dirname, './client/build/index.html'), function(err) {
	    if (err) {
	      res.status(500).send(err)
	    }
	  }
	})
	app.get('/*', cors(), function(_, res) {
	  res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
	    if (err) {
	      res.status(500).send(err)
	    }
	  })
	})
}; 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});