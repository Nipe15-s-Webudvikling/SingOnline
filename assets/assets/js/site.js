import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://sqvpdkcqnifajkhtovmm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxdnBka2NxbmlmYWpraHRvdm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNzQ5NjksImV4cCI6MjA0NTg1MDk2OX0.KPcgVisfT1c-upFrg-TvpmyqJgISnSHOKbbLVlSaQUo';
const supabase = createClient(supabaseUrl, supabaseKey);

async function getRandomSongs() {
    const { data, error } = await supabase
        .from('songs')
        .select('*,artists(name)')
        .limit(10);

    if (error) {
        console.error("Error fetching random songs:", error);
    } else {
        console.log("Random songs:", data);
    }

    
    const songsContainer = document.getElementById('songs-container');
    data.forEach(song => {

        const songDiv = document.createElement('div');
        songDiv.classList.add('song');


        songDiv.innerHTML = `
            <p>${song.title} -  ${song.artists.name}</p>
        `;

        songsContainer.appendChild(songDiv);
    });
    if (data.length === 0) {
        console.log("No songs found.");
        return; 
    }
}


getRandomSongs();
