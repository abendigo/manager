<script>
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

  fetch(`/auth`, {
    method: 'delete'
  })

  $session.user = undefined;

</script>

<h3>Come back soon</h3>
