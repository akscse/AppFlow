"use strict";

/*Write a program to calculate the total price of your phone purchase.
You will keep purchasing phones until you
run out of money in your bank account. You’ll also buy accessories
for each phone as long as your purchase amount is below
your mental spending threshold.*/

var BankAccount = function (bankName) {
	this.bankName = bankName;
	this.user = [];
	this.userCount = 0;
	this.bankTotalBalance = 0;
	
	/* update bank's total amount */
	this.updateBankTotalBal = function(amount, creditDebit){
		if(creditDebit == "credit"){
			this.bankTotalBalance += amount;
		}else if(creditDebit == "debit"){
			this.bankTotalBalance -= amount;
		}
	}
	/* creating user account */
	this.createUserAccount = function (userName, amount, passWord) {
		this.user[this.userCount] = {
			"userName" : userName,
			"ID" : this.userCount,
			"passWord" : passWord,
			"amount" : amount
		};
		this.userCount++;
		this.updateBankTotalBal(amount, "credit");
		return this.user[this.userCount - 1].ID;
	}
	
	/* verifying password */
	this.passCodeCheck = function(userID, passWord){
		if(this.user[userID].passWord == passWord){
			return true;
		} else{
			return false;	
		}
	}

	/* get account amount */
	this.checkBalance = function (userID, passWord) {
		if( this.passCodeCheck(userID, passWord) ){
			console.log("Your amount is: " + this.user[userID].amount);
			return this.user[userID].amount;	
		} else{
			console.log("Un-authorized");
			return;
		}
	};
	/* debit */
	this.debiTransaction = function(userID, passWord, amount){
		if( this.passCodeCheck(userID, passWord) ){
			
		} else{
			console.log("Un-authorized");
			return;
		}
		if(amount <= this.user[userID].amount){
			this.user[userID].amount -= amount;
			this.updateBankTotalBal(amount, "debit");
			return amount;
		}
		else {
			console.log("Insufficient amount");
			return false;
		}
	}
	
	this.creditTransaction = function( userID, amount){
		this.user[ userID ].amount += amount;
		this.updateBankTotalBal(amount, "credit")
	}
};

var Person = function (name) {
	this.name = name;
	this.bankAccount = [];
	this.boughtPhone = [];
	this.boughtAcc = [];
}

var PhoneMod = function PhoneMod(model, price) {
	this.model = model;
	this.price = price;
};

var PhoneAcc = function PhoneAcc(acc, price) {
	this.acc = acc;
	this.price = price;
};

var PhoneShop = function PhoneShop(phoneShop) {
	this.phoneShop = phoneShop;
	this.hasPhone = [];
	this.hasAcc = [];
	this.bankAccount=[];

	/* display available phones */
	this.displayPhone = function () {
		console.log("We have following phones available at our " + this.phoneShop + "shop.");
		for (var _i = 0; _i < Object.keys(this.hasPhone).length; _i++) {
			var phone = Object.keys(this.hasPhone)[_i];
			console.log(this.hasPhone[phone].model + ": " + this.hasPhone[phone].price);
		}
	};

	/* display accessories */
	this.displayAccessories = function () {
		console.log("We have phones accessories available at our " + this.phoneShop + "shop.");
		for (var _i = 0; _i < Object.keys(this.hasAcc).length; _i++) {
			var acc = Object.keys(this.hasAcc)[_i];
			console.log(this.hasAcc[acc].acc + ": " + this.hasAcc[acc].price);
		}
	};

	/* add phones to the shop */
	this.addPhone = function (phones) {
		for (var i = 0; i < Object.keys(phones).length; i++) {
			var phoneName = Object.keys(phones)[i];
			this.hasPhone[phoneName] = new PhoneMod(phoneName, phones[phoneName]);
		}
	};

	/* add accessories to the shop */
	this.addAccessories = function (accessories) {
		for (var j = 0; j < Object.keys(accessories).length; j++) {
			var accName = Object.keys(accessories)[j];
			this.hasAcc[accName] = new PhoneAcc(accName, accessories[accName]);
		}

	};
	/* phone cost */
	this.phoneCost = function(phoneName){
		console.log("Phone cost: " + this.hasPhone[phoneName].price);
		return this.hasPhone[phoneName].price;
	};
	/* accessories cost */
	this.accessoriesCost = function(accName){
		console.log("Phone cost: " + this.hasAcc[accName].price);
		return this.hasAcc[accName].price;
	};
};

var init = function init() {
	debugger;
	/* person */
	var ramaNujan = new Person("ramaNujan");

	/* banking available */
	var sbi = new BankAccount("SBI");
	/* open users account in SBI */
	ramaNujan.bankAccount[sbi.bankName] = sbi.createUserAccount(ramaNujan.name, 12000, "sbiBank");
	
	/* phone container */
	var phone = {
		"samsung" : 10000,
		"moto" : 12000,
		"nokia" : 5000,
		"yureka" : 3200,
		"mi" : 12000
	};
	/* accessories container */
	var accessories = {
		"earphone" : 500,
		"charger" : 500,
		"powerbank" : 1200,
		"phonecover" : 200,
		"temperglass" : 300
	};
	/* shop */
	var chikMang = new PhoneShop("chikMang");
	chikMang.bankAccount[sbi.bankName] = sbi.createUserAccount(chikMang.phoneShop, 0, "shopCode");
	/* adding phones */
	chikMang.addPhone(phone);
	/* adding accessories */
	chikMang.addAccessories(accessories);
	
	var exitCondition ="999";
	
	while(exitCondition !== "0"){
		exitCondition = prompt("Operations: Check Out Phones: 1, Check Out Accessories: 2, Buy Phone: 3, Buy Accessories: 4, Credit Amount: 5, Exit: 0");
		switch( exitCondition ){
			case "1" : 	
					chikMang.displayPhone();
					break;
			case "2" : 
					chikMang.displayAccessories();
					break;
			case "3" :
					var selectedPhone = prompt("Enter Model name");
					console.log("You have following bank accounts: " + Object.keys(ramaNujan.bankAccount));
					var bankSelected = prompt("Select BankAccount");
					if( sbi.debiTransaction(ramaNujan.bankAccount[bankSelected], prompt("Please enter Password"), chikMang.phoneCost(selectedPhone)) ) {
						sbi.creditTransaction(chikMang.bankAccount["SBI"], chikMang.phoneCost(selectedPhone));
						ramaNujan.boughtPhone[selectedPhone] = chikMang.hasPhone[selectedPhone];
						console.log("Transaction successful");
					} else {
						console.log("Transaction Failed");
					}
					break;
			case "4" : 
					var selectedAcc = prompt("Enter Acc name");
					console.log("You have following bank accounts: " + Object.keys(ramaNujan.bankAccount));
					var bankSelected = prompt("Select BankAccount");
					if( sbi.debiTransaction(ramaNujan.bankAccount[bankSelected], prompt("Please enter Password"), chikMang.accessoriesCost(selectedAcc)) ) {
						sbi.creditTransaction(chikMang.bankAccount["SBI"], chikMang.accessoriesCost(selectedAcc));
						ramaNujan.boughtAcc[selectedAcc] = chikMang.hasAcc[selectedAcc];
						console.log("Transaction successful");
					} else {
						console.log("Transaction Failed");
					}
					break;					
			case "5" : 
					sbi.creditTransaction(ramaNujan.bankAccount[prompt("Select BankAccount")], parseInt(prompt("Enter amount to be credit")));
					break;
			case "0" : 
					break;
			default : 
					console.log("Something went wrong");
		}
	}
};

init();