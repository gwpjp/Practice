#1
prob1 <- function(N) {
sum <- 0
for (i in 1:(N-1)){
  if (i%%3 == 0 | i%%5 == 0){
    sum <- sum + i
  }
}
return(sum)
}

prob1(1000) #233,168
system.time(prob1(1000)) #0.001 s
system.time(prob1(10000)) #0.011 s

  #solution v2
prob1v2 <- function(N) {
  
}
