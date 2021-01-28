ionic start sg-ionic-twitter-ui tabs --type=angular

## A custom component for Tweets  

ionic g module components/sharedComponents --flat  
ionic g component components/tweet  

## Custom directives for manipulating the header  

ionic g module directives/sharedDirectives --flat  
ionic g directive directives/HideHeader  
ionic g directive directives/StickySegment   
