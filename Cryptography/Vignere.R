code <- "CUDRYHSODBODGRZAFDNRFCRQTELCTHNVXSOHSGNNBZNSRRQHVROOCLNTWHRELHHPELNGIOEWHRPOQHRAFOZSUGHRUHWNVTUHSBQOSEEAMAZLNODBODGRDWRDLGKYYRNQRNODNXHRUHACSLVHDULSTHNVXSGRMNQYCUOOOEZVHVVIAYEAWIBQSVQCYXDRWHRVPRHDBPEGHRNQDGKEPRWPDTPKEE"

for (n in 4:10) {
  for (i in 1:(nchar(code)-n)) {
    pos <- substr(code,i,i+n-1)
    for (j in (i+1):(nchar(code)-n+1)){
      temp <- substr(code,j,j+n-1)
      if (pos == temp) {
        print(c(i, pos, j, temp,j-i))
      }
    }
  }
}

#102, 120, 48
intersect(intersect(divisors(102), divisors(48)),divisors(120))

freq <- matrix(data = 0, nrow = 26, ncol = 6)
rownames(freq) <- LETTERS
for (i in 1:nchar(code)) {
  row <- substr(code,i,i)
  col <- (i - 1) %% 6 + 1
  freq[row,col] <- freq[row,col] + 1
}
freq
freq <- as.data.frame(freq)
ggplot(data=freq, aes(x=rownames(freq), y=freq[,1])) + geom_bar(stat="identity")
ggplot(data=freq, aes(x=rownames(freq), y=freq[,2])) + geom_bar(stat="identity")
ggplot(data=freq, aes(x=rownames(freq), y=freq[,3])) + geom_bar(stat="identity")
ggplot(data=freq, aes(x=rownames(freq), y=freq[,4])) + geom_bar(stat="identity")
ggplot(data=freq, aes(x=rownames(freq), y=freq[,5])) + geom_bar(stat="identity")
ggplot(data=freq, aes(x=rownames(freq), y=freq[,6])) + geom_bar(stat="identity")

freq2 <- matrix(data = 0, nrow = 26, ncol = 3)
rownames(freq2) <- LETTERS
for (i in 1:nchar(code)) {
  row <- substr(code,i,i)
  col <- (i - 1) %% 3 + 1
  freq2[row,col] <- freq2[row,col] + 1
}
freq2
freq2 <- as.data.frame(freq2)
ggplot(data=freq2, aes(x=rownames(freq2), y=freq2[,1])) + geom_bar(stat="identity")
ggplot(data=freq2, aes(x=rownames(freq2), y=freq2[,2])) + geom_bar(stat="identity")
ggplot(data=freq2, aes(x=rownames(freq2), y=freq2[,3])) + geom_bar(stat="identity")


code2 <- substr(code,1,1)
for (i in 2:nchar(code)){
  l <- substr(code,i,i)
  fill <- l
  if ((i-1) %% 3 == 1) {
    fill <- LETTERS[(match(l,LETTERS)+13) %% 26]
  }
  if ((i-1) %% 3 == 2) {
    fill <- LETTERS[(match(l,LETTERS)+23) %% 26]
  }
  code2 <- paste(code2,fill,sep = "")
}
code2
#CHARLESBABBAGEWASANECCENTRICGENIUSBESTKNOWNFORDEVELOPINGTHEBLUEPRINTFORTHEMODERNCOMPUTERHEWASTHESONOFBENJAMINBABBAGEAWEALTHYLONDONBANKERHEAPPLIEDHISGENIUSTOMANYPROBLEMSHISINVENTIONSINCLUDETHESPEEDOMETERANDTHECOWCATCHER
