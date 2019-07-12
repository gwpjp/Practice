library("ggplot2")
library("numbers")
#This is the code I'm trying to break
code <- "ETGURLXRGAJGMOMTGECGXANUJCCMXBTFKTHRNFZNAHQNVZABBWFKFLXMANUYCGXXUCKFTUIPCDCPVUHCZLIXHJKKFIAIJTZRXGKFQWYAUIEVZRGBXUGDGJLEAFGMGMENPUFXLMAVVPTLXVPTPNIXBIIYEACJCJGVGMGGUDDKQNPPWTTVFEIWEMSTTRNWRANUEMIAMAIDMGXXUCEYIHSYVYYIAIYRVBWBQUKJBXIPBORRXVABTBZJMEGVYCPZIBHKFXKXLPZLTOMTGECGXHREZBTWXUCKFTAEQCDYHLIQGEMJZLZQECNMSOGRZAXXBCSYCWSAJZQRTVRGIYCWGBPTCCMVNVVMCTPVHVMULXHFPGIPEFQEJNMLRPKFPMLRDVEPGVRUVYGVLVPKMPGIJEZNWXV"
code2 <- "EFMZRNQMWOBEBUIXDDMTRDGAXGJUBKNEIVWATHLHJDZUOAOENVIBROCXCSLZUIFUDCSPHSGMDTQTQAUNVSWTVOAKXUPZVNGATAQJQLRVGSIYROSMWSJUBKGATAITHFNVIIZKEOSMWSJUBKUTHWVIYUQXSHPKBNVHCOBSLRRJJSAZFOLHJFMRVKRPDKBNVSOHDYKUZEFPXHPGAOABDBMBRNVYNCCJBNGIPFBOPUYTGZGRVKRHCWWTFIZLJFMEBUPTCOXVEEPBPHMZUEYHVWAZVCFHUGPOCPVGVOVEFOEMDTXXBDHVTRQYPRRXIZGOASVWTCNGAAYETUMJCRBZGOUSVNTFPBCGY"
code3 <- "SOMZAQLLIWSZKBBOGKLBBQJNNVODSKIPVSSQWUIDLGWTBTALGPVSHPETIDAJUVNULYOHVMJRBVZYALWUIQKRDLBUUQAUAQLFAJPUWDCVIXGDIFEAJIWZIZWBQJIFGPWULMMRDVZUKRKOMXHNAVXXWJAHZZZMSAWIJGPLJQSSPPNGDNNVODSKOTGRWCHPVSAQPOIFOFAUEQHPAWIDWYLYWSJYIAPQWVLLZUWLYLKMFZAQCELJERMOGKLVAUFELVMFJWKYUGKGYZWYWNNVODSKOHZQWJANIZLQKTMMJCAEYGAQEAMEGKAHZQKNWYSXALCTGODYETQELFWAQFAQLVAEAZHLBAOPEAMSJYJKXDGENHUEFMXSMBJMCYIYKRNBTKEYCUQRAAAUBAFCOJWYHSPLZBJMCYIYEGJNQESLWYBNWAWBAQARWWXXACOHKOMKQSIFWBGUWIDCZNMFGRDLEAJJZIMOSSOLQFJCMBQDWQORQXDYJKQZYCJBQFQYJKMEHCYPIXDWXLKMMQAPBBJMZBKQKMXQMOLQKMJQSSPFXDGENHUYWPODPAKSXJWZKAEVCEDWRPMILFATAQDTAZIESPPPAFKUESTQFHKFETSRPOMKVMWULIAJHKWULZAABQJ"
#This is the data on letter frequencies in English
letfreq <- c(8.167,1.492,2.782,4.253,12.702,2.228,2.015,6.094,6.966,.153,.772,4.025,2.406,6.749,7.507,1.929,.095,5.987,6.327,9.056,2.758,.978,2.360,.150,1.974,.074)
letfreq <- letfreq/100

#Assign the cipher
cipher <- code3

#This checks to see if there are any repeating patterns in the cipher
for (n in 4:10) {
  for (i in 1:(nchar(cipher)-n)) {
    pos <- substr(cipher,i,i+n-1)
    for (j in (i+1):(nchar(cipher)-n+1)){
      temp <- substr(cipher,j,j+n-1)
      if (pos == temp) {
        print(c(i, pos, j, temp,j-i))
      }
    }
  }
}

#This is the list of how long a pattern takes to repeat
intersect(intersect(divisors(36), divisors(96)),divisors(150))
#The best guess for the length of the key phrase
charl <- 6

#----------------------------
#Once I have decided on the most likely length of the key phrase
#Finding the frequencies for each position
freq <- matrix(data = 0, nrow = 26, ncol = charl)
rownames(freq) <- LETTERS
for (i in 1:nchar(cipher)) {
  row <- substr(cipher,i,i)
  col <- (i - 1) %% charl + 1
  freq[row,col] <- freq[row,col] + 1
}
freq
freq <- as.data.frame(freq)

#Finding the most likely Caesar shifts at each position
fact <- nchar(cipher)/charl
sum <- matrix(data=0,nrow=26,ncol=charl)
mins <- matrix(data=0,nrow=1,ncol=charl)
for (n in 1:charl){ 
  for (i in 0:25){
    for (j in 1:26){
      newpos <- (j+i-1) %% 26 + 1
      dif <- (freq[newpos,n]-fact*letfreq[j])^2
      sum[i+1,n] <- sum[i+1,n] + dif
    }
  }
  mins[1,n] <- match(min(sum[,n]),sum[,n])
}
sum
mins

#Deciphering the cipher
decrypted <- ""
for (i in 1:nchar(cipher)){
  l <- substr(cipher,i,i)
  m <- (i-1) %% charl + 1
  fill <- LETTERS[(match(l,LETTERS)+27-mins[1,m]) %% 26]
  decrypted <- paste(decrypted,fill,sep = "")
}
decrypted
