#1
x <- NULL
y <- NULL
z <- NULL
for (i in c(1,3,7,9)) {
  for (j in c(2,4,6,8)) {
    x <- as.numeric(paste(i,j,sep=""))
    for (k in c(1,3,7,9)) {
      if (k != as.numeric(substr(x,1,1))) {
        y <- as.numeric(paste(x,k,sep=""))
        if (y %% 3 == 0) {
          for (l in c(2,4,6,8)) {
            if (l != as.numeric(substr(y,2,2))) {
              z <- as.numeric(paste(y,l,sep=""))
              if (z %% 4 == 0) {
                z <- as.numeric(paste(z,5,sep=""))
                print(z)
                
                
                
                
              }       
            }
          }
        }       
      }
    }
  }
}