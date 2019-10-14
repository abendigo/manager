<script>
  import { goto, stores } from '@sapper/app';
  import isoCountries from 'i18n-iso-countries';

  isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  const countries = Object.entries(isoCountries.getNames("en"));

  const { session } = stores();

  // if (!$session.user) {
  //   goto('/login');
  // }

  function handleSubmit(e) {
    console.log('handleSubmit', { e })
  }
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<h3>Profile</h3>
<form on:submit|preventDefault={handleSubmit}>
  First Name: <input type=text name=firstname />
  <br />
  Last Name: <input type=text name=lastname />
  <br />
  Country:
  <select>
    <option>------------------------</option>
    {#each countries as [key, value] (key)}
      <option value={key}>{value}</option>
    {/each}
  </select>
  <br />
  <input type="submit" />
</form>
Balance: 0.000 DAI
