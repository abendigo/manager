<script context="module">
  console.log('module')
</script>

<script>
  import { goto, stores } from '@sapper/app';
  import { onMount } from 'svelte';

  const { session } = stores();

  console.log('script');

  onMount(async () => {
    console.log('onMount');

    console.log('window.ethereum', window.ethereum);
    console.log('window.web3', window.web3);

    console.log('web3.eth.personal', web3.eth.personal);
    console.log('web3.personal', web3.personal);

    console.log('ethereum.networkVersion', ethereum.networkVersion);
    console.log('ethereum.selectedAddress', ethereum.selectedAddress);
    console.log('ethereum.isMetaMask', ethereum.isMetaMask);

    console.log('ethereum.autoRefreshOnNetworkChange', ethereum.autoRefreshOnNetworkChange);
    ethereum.autoRefreshOnNetworkChange = false;

    ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log('accountsChanged', accounts);
    });

    ethereum.on('networkChanged', function (network) {
      // Time to reload your interface with accounts[0]!
      console.log('networkChanged', network);
    });

    ethereum.enable()
      .then(function (accounts) {
        console.log('enabled', accounts);
        // You now have an array of accounts!
        // Currently only ever one:
        // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
      })
      .catch(function (reason) {
        // Handle error. Likely the user rejected the login:
        console.log(reason === "User rejected provider access")
      });
  });

  async function loginWithMetaMask(e) {
    console.log('loginWithMetaMask', { e });

    const response = await fetch(`/users/${ethereum.selectedAddress}/nonce`).then(response => response.json());
    console.log(response);

    web3.personal.sign('this is my message', ethereum.selectedAddress, function(err, result) {
      console.log('==', err, result);

      fetch(`/auth`, {
        body: JSON.stringify({ publicAddress: ethereum.selectedAddress, signature: result }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(response => {
        console.log({ response });
        $session.user = 'foo';
        goto('/');
      });
    });

  }
</script>

<style>
  .login-button {
    color: white;
    display: block;
    font-size: 16px;
    height: 60px;
    margin: 10px auto;
    width: 300px;
  }

  .login-button:hover {
    opacity: 0.9;
  }

  .login-email {
    background-color: darkgray;
  }

  .login-fb {
    background-color: rgb(72, 98, 163);
  }

  .login-mm {
    background-color: rgb(255, 125, 0);
  }
</style>

<svelte:head>
	<title>Sign in/Sign up</title>
</svelte:head>

<button class="login-button login-mm" on:click={loginWithMetaMask}>Login with MetaMask</button>
<button class="login-button login-fb" disabled>Login with Facebook</button>
<button class="login-button login-email" disabled>Login with Email</button>
