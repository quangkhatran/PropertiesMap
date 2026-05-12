function aggregatePlaces(videos){

  const mentions = {};

  videos.forEach(video=>{

    video.places.forEach(place=>{

      if(!mentions[place]){
        mentions[place] = 0;
      }

      mentions[place]++;

    });

  });

  return Object.entries(mentions)
    .sort((a,b)=>b[1]-a[1]);

}

module.exports = {
  aggregatePlaces
};