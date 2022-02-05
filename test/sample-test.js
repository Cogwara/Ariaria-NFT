const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AriariaMarket", function () {
  it("Should create and enable sales of NFT", async function () {
    const Market = await ethers.getContractFactory("AriariaMarket");
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress =  market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftAddress =  nft.address;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("100", "ether")

    await nft.creatToken("https://nfts.com");
    await nft.creatToken("https://nfts1.com");

    await market.creatMarketItem(nftAddress, 1, auctionPrice, {value: listingPrice} );
    await market.creatMarketItem(nftAddress, 2, auctionPrice, {value: listingPrice} );

    const [_, buyerAddress ] = await ethers.getSigners();
    await market.connect(buyerAddress).creatMarketSale(nftAddress, 1, {value: auctionPrice});

    let items = await market.fetchMarketItems();
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId);

      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller, 
        owner: i.owner,
        tokenUri
      }
      return item;
      }));
      console.log('items: ', items);

  });
});
 