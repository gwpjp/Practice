#RSA Example
#1) Choose p & q prime
p <- 3
q <- 11
#2) n = p * q
n <- p * q
n
#3) phi_n = (p-1)*(q-1)
phi_n <- (p-1)*(q-1)
phi_n
#4) Choose e s.t. 1 < e < phi_n and e,phi_n are coprime.
e <- 7
#5) Find d s.t. d is a multiplicative inverse for e mod phi_n
d <- 3
#6) Public key is (e,n)
#7) Private key is (d,n)
#8) We can encrypt m by m^e % n.
m <- 15
m^e
c <- m^e %% n
c
#9) We can decrypt c by c^d % n.
c^d %% n

N <- n-1
test <- matrix(nrow=N, ncol = 2)
for (m in 1:N) {
  c <- m^e %% n
  test[m,1] <- m
  test[m,2] <- c^d %% n
}
test

#So (e,n,c) is public
e
n
c
#To hack this we need to find the prime factors of n.  That is 11 and 3.  
#Then we know phi_n = 20
#So we can conclude that d is 3.


