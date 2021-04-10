<script>
    import { onMount } from 'svelte';
    import { socket } from './../socket.js' //this is the connection set up at the root of the Svelte app

    $: hats = []; // a nice, reactive, but empty, array to hold all your hats

    let newHatName;

    async function updateHats() {
        // Sails maps REST verbs to methods on the sails.io.socket
        // so, if you emit 'get' on the socket, with the route you want to get hats from
        // Sails will give you what you're looking for over the websocket connection

        socket.get('/hats', (body, res) => {
            hats = [...body];
        });
    }

    async function createHat(hatData) {
        socket.post('/hats', hatData, (resData, jwRes) => {
            if(jwRes.statusCode !== 200) {
                console.log("Oops! We couldn't save the hat for some reason." )
            } else {
                updateHats(); // right now
                newHatName = undefined;
            }
        });
    }

    async function deleteHat(hatId) {
        socket.delete('/hats', {id: hatId}, (resData, jwRes) => {
            if(jwRes.statusCode !== 200) {
                console.log("Oops! We couldn't delete the hat for some reason." )
            } else {
                updateHats(); // right now
            }
        });
    }

    //Sails will emit messages when anything happens to one of your blueprint models
    // so, listening for changes on the name of your blueprint model, in this case 'hats',
    // and calling the updateHats() function when changes happen should ensure data is synced
    socket.on('hats', () => {
        updateHats();
    })

    // update the hats when the component mounts
    onMount(() => {
        updateHats();
    });
</script>

<form on:submit|preventDefault={createHat({name: newHatName})}>
    <input type="text" bind:value={newHatName}>
    <button type="submit">Add</button>
</form>

<ul>
    {#each hats as hat}
        <li>{hat.name} ({hat.id}) - Created: {new Date(hat.createdAt)} <button on:click={deleteHat(hat.id)}>X</button></li>
    {/each}
</ul>