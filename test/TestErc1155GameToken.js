var GameContarct = artifacts.require("./HorseGameErc1155.sol");
var BN = require("bn.js");
var BigNumber = require("bignumber.js");

contract("HorseGameErc1155", function(accounts) {
    const fungibleTokenBase = "340282366920938463463374607431768211456"; // 129 bit 10000...000
    const nonFungibleTokenBase =
        "57896044618658097711785492504343953926634992332820282019728792003956564819968"; // non fungible token base 256bit 1000..00
    const fungibleBaseBN = new BN(fungibleTokenBase);
    const nonFungibleBaseBN = new BN(nonFungibleTokenBase);
    const coinBase = accounts[0];
    const subAccount = accounts[1];
    const sampleLotteryAddress = "0x" + "1".repeat(40);

    describe("Test Mint Fungible-Token", async function() {
        it("[1] contract owner should be coinbase", async function() {
            const instance = await GameContarct.deployed();
            const isOwner = await instance.isOwner();
            assert.equal(true, isOwner);
        });

        it("[2] mint fungible token test ", async function() {
            const instance = await GameContarct.deployed();
            await instance.mintFungible(
                "FungibleToken1",
                10000,
                1000,
                sampleLotteryAddress,
                "http://localhost:7777",
                0,
                "FT1",
                false
            );
            const nonce = await instance.nonce();
            const nonceBN = new BN(nonce.toNumber());
            const tokenType = fungibleBaseBN.mul(nonceBN).toString();
            const totalSupply = await instance.totalSupply(tokenType);
            const balance = await instance.balanceOf(tokenType, coinBase);
            console.log(
                "nonce: ",
                nonce,
                "tokenType: ",
                tokenType,
                "totalSupply: ",
                totalSupply
            );
            assert.equal("10000", totalSupply.toString());
            assert.equal("10000", balance.toString());
        });
    });
    describe("Test Mint Non-Fungible ", async function() {
        it("[1] mint non-fungible token", async function() {
            const instance = await GameContarct.deployed();
            await instance.mintFungible(
                "NonFungibleToken1",
                0,
                5,
                sampleLotteryAddress,
                "http://localhost:7777",
                0,
                "NFT1",
                true
            );
            const nonce = await instance.nonce();
            const nonceBN = new BN(nonce.toNumber());
            const tokenType = nonFungibleBaseBN
                .add(fungibleBaseBN.mul(nonceBN))
                .toString();
            const totalSupply = await instance.totalSupply(tokenType);
            const balance = await instance.balanceOf(tokenType, coinBase);

            assert.equal(totalSupply.toString(), "0");
            assert.equal(balance.toString(), "0");
        });
        it("[2-2] mint new token", async function() {
            const instance = await GameContarct.deployed();
            const nonce = await instance.nonce();
            const nonceBN = new BN(nonce.toNumber());
            const tokenType = nonFungibleBaseBN
                .add(fungibleBaseBN.mul(nonceBN))
                .toString();
            await instance.mintNonFungible(tokenType, coinBase, "NF-T-1");
            const balance = await instance.balanceOf(tokenType, coinBase);
            console.log("balanceOf: ", balance);
            assert.equal(balance.toString(), "1");
        });
    });
});
