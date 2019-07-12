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
                z <- as.numeric(paste(z,5,sep="")) #This is now the 5 digit number
                for (m in c(2,4,6,8)) {
                  if (m != as.numeric(substr(z,2,2)) && m != as.numeric(substr(z,4,4)) ) {
                    u <- as.numeric(paste(z,m,sep=""))
                    if (u %% 6 == 0) {
                      for (n in c(1,3,7,9)) {
                        if (n != as.numeric(substr(u,1,1)) && n != as.numeric(substr(u,3,3)) ) {
                          w <- as.numeric(paste(u,n,sep=""))
                          if (w %% 7 == 0) {
                            for (o in c(2,4,6,8)) {
                              if (o != as.numeric(substr(w,2,2)) && o != as.numeric(substr(w,4,4)) && o != as.numeric(substr(w,6,6)) ) {
                                t <- as.numeric(paste(w,o,sep=""))
                                if (t %% 8 == 0) {
                                  for (p in c(1,3,7,9)) {
                                    if (p != as.numeric(substr(t,1,1)) && p != as.numeric(substr(t,3,3)) && p != as.numeric(substr(t,7,7)) ) {
                                      s <- as.numeric(paste(t,p,sep=""))
                                      if (s %% 9 == 0) {
                                        print(s)
                                        
                                        
                                        
                                        
                                      }       
                                    }
                                  }
                                  
                                  
                                  
                                }       
                              }
                            }
                            
                            
                            
                          }       
                        }
                      }                  
                      
                      
                      
                      
                    }       
                  }
                }
                
                
                
              }       
            }
          }
        }       
      }
    }
  }
}