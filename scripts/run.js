const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("NFTGame");

  const contract = await ContractFactory.deploy(
    ["Calm Cat", "Cool Cat", "Evil Cat"], // Names
    [
      "https://i.imgur.com/kVxV5Yn.png", // Images
      "https://i.imgur.com/4U7AClV.png",
      "https://i.imgur.com/hCLiYuy.png",
    ],
    [200, 250, 150], // HP values
    [100, 80, 150], // Attack damage values
    "Big Cat", // Boss name
    "https://i.imgur.com/lDXOm01.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  let txn;

  txn = await contract.mintCharacterNFT(2);
  await txn.wait();

  let returnedTokenUri = await contract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);

  txn = await contract.attackBoss();
  await txn.wait();

  txn = await contract.attackBoss();
  await txn.wait();

  txn = await contract.healCharacter();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
