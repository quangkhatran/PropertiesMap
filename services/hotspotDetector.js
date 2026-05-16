function detectHotspots(videos=[]){

  const counts = {};

  videos.forEach(video=>{

    (video.places || [])
    .forEach(place=>{

      if(!counts[place]){
        counts[place] = 0;
      }

      counts[place]++;

    });

  });

  return Object.entries(counts)

    .sort((a,b)=>b[1]-a[1])

    .slice(0,10)

    .map(item=>({

      area:item[0],

      mentions:item[1],

      trend:

        item[1] >= 5

        ? "HOT"

        :

        "RISING"

    }));

}

module.exports = {
  detectHotspots
};