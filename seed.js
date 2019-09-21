var mongoose=require('mongoose');
var News=require('./models/news');
//var Comment=require('./models/comment');


var data=[
    {
        name:'Sensex zooms 1,921 points as markets cheer corporate tax cuts',
        description: `Equity indices on Friday skyrocketed over 1,900 points as markets welcomed govt's move to slash corporate tax rates for domestic companies to boost growth rate from six- year low by incentivising investments to help create jobs.Logging its biggest intra - day spike in over a decade, the 30 - share BSE index zoomed 1, 921.15 points or 5.32 % to close at 38, 014.62.`,
    },
    {
        name:'Steps to cut corporate tax historic: PM Modi',
        description:`Prime Minister Narendra Modi on Friday welcomed the government's move to slash corporate tax rate for domestic companies by calling it 'historic'. Stating the tax cuts as a great stimulus to Make in India, Modi said that his government is leaving no stone unturned to make India a $5 trillion economy.`
    },
    {
        name:'World Boxing: Amit enters final, bronze for Manish',
        description:`Asian champion Amit Panghal (52kg) on Friday became the first Indian to enter the finals of the World Men's Boxing Championship while Manish Kaushik (63kg) signed off with a bronze medal after going down in the semifinals here. Second seeded Panghal prevailed 3-2 against Kazakhstan's Saken Bibossinov in the last-four stage.`
    },       
    {
        name:'Twitter closes thousands of fake news accounts',
        description:`Twitter said it has closed down thousands of accounts across the world. Accounts coming from China seeking to sow discord among protesters in Hong Kong were closed down, as well as accounts amplifying a pro-Saudi message coming from Egypt and the UAE directed at Qatar and Yemen, Twitter said. Fake news accounts were also `
    }, 
    {
        name: `Pak PM finds J& K's progress difficult to accept`,
        description:`In a hard-hitting opinion piece in The New York Times, Indian Ambassador to the US Harsh Vardhan Shringla wrote, "Clearly, this prospect for a more prosperous J&K, and Ladakh, cuts the ground under the feet of Pakistan." Shringla said Khan finds it difficult to accept that the Kashmir region is now back on the road to progress after India repealed `
    },      
    {
        name:'MV Act: Nine-fold rise in cars seeking PUCs',
        description:`In the past 18 days, there has been a nine-fold increase in the number of vehicles seeking pollution under control certificates (PUCs) since the amended Motor Vehicles Act was notified. The data available for 11 states show that the maximum increase in the number of PUCs issued has been in Bihar and Uttarkhand when compared to the data `
    },      
]


function seedDB(){
    News.remove({},function(err){
        if(err){
            console.log(err);
        }
        //console.log('removed Recipes!!');
        data.forEach(function(seed){
            News.create(seed,function(err,news){
              if(err){
                  console.log(err)
              }else{
                  //console.log('added a recipe');
                  //create a comment
                  Comment.create(
                      {
                      text:'Yeah I think its right...',
                          author: { username: 'Satya'}
                      
                  },function(err,comment){
                      if(err){
                          console.log(err);
                      }else{
                          news.comments.push(comment);
                          news.save();
                          //console.log('created new comment');
                      }
                  });
              }
          });
      });          
    });
}
    

module.exports=seedDB;