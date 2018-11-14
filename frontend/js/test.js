document.addEventListener('scatterLoaded',function(scatterExtension) {
	scatter = window.scatter;
	if (scatter == null) {
		alert("请先安装scatter");
	}else{
		alert("scatter working");
	}
});

// EOS RPC 网络设置
var network = {
	blockchain:'eos',  // or eosforce
	protocol:'https',
	host:'eosforcenet.medishares.net',
	port:443,
	chainId:'bd61ae3a031e8ef2f97ee3b0e62776d6d30d4833c8f7c1645c657b149151004b'
};
var currentAccount = null;

// 连接
function connect(){
	scatter.connect('MY_GAME_NAME').then(function(connected) {
		if(connected){
   			alert('connect success');
  		}else{
    		alert('connect fail');
  		}
	});
}

// 登录，获取 EOS 账户
function login(){
	// scatter.forgetIdentity();
	scatter.getIdentity({accounts:[network]}).then(function(result){
  		currentAccount =  result.accounts[0];
  		alert('account:'+JSON.stringify(currentAccount));
	}).catch(error => {
  		alert('error:'+JSON.stringify(error));
	});
}

// 转账
function transfer(){

	if (currentAccount == null) {
    	alert('请先登录');
	}
	// alert(network.protocol+'://'+network.host);
	var eos = scatter.eos(network, Eos);
	var to = window.document.input.toAccount.value;
	var amount = window.document.input.amount.value;
	var memo = window.document.input.memo.value;

	if(amount <= 0){
		alert("Amount for each transaction must be larger than 0!");
		return false;
	}
	if(memo.length >= 256){
		alert("Length of memo is supposed to be less than 256!");
		return false;
	}
	amount += ' EOS';

	eos.transfer(currentAccount.name, to, amount, memo).then(function(result){
  		alert('result:'+JSON.stringify(result));
	}).catch(error => {
  		alert('error:'+JSON.stringify(error));
	});

}

function testTransfer(){
	var to = window.document.input.toAccount.value;
	var amount = window.document.input.amount.value;
	alert(to);
	amount += ' EOS';
	alert(amount);
}