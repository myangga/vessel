<script>
	import { socket } from './socket.js';
	import Hats from './components/Hats.svelte';
	export let name;

	socket.on('connect', () => {
		console.log('Events are working');
	});
</script>

<main>
	<h1>Hello {name}!</h1>
	<Hats />
	<div class="vessel">
	<img src="submarine.svg" alt="A Yellow Underwater Vessel" title="Vessel">
	</div>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p class="and">and</p>
	<p>Visit the <a href="https://sailsjs.com/whats-that">Sails site</a> to learn how to build Sails apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff9801;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.vessel {
		margin: 7em 0;
	}
	/* .icon-credit {
		margin-top: 10em;
		font-size: 0.7rem;
	} */
	.and {
		font-weight: 100;
		color: #0178ff;
		font-size: 2em;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>