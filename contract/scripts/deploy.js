async function main() {

    const [deployer] = await ethers.getSigners();
    
    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const TradeStorage = await ethers.getContractFactory("TradeStorage");
    const storage = await TradeStorage.deploy();

    console.log("Lottery address:", storage.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });