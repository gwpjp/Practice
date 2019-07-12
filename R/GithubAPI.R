library(rjson)
N <- 10000
json_file <- paste("https://api.github.com/repos/facebook/react-native/commits?page=1&per_page=",N,sep="")
json_data <- fromJSON(file=json_file)
gwpjp <- as.data.frame(array(NA, dim = N))
colnames(gwpjp) <- "email"
for(i in 1:nrow(gwpjp)){
  gwpjp$email[i] <- json_data[[i]]$commit$committer$email
  gwpjp$author[i] <- json_data[[i]]$author$login
  gwpjp$committerId[i] <- json_data[[i]]$committer$id

}
unique(gwpjp$email)
unique(gwpjp$author)
unique(gwpjp$committerId)
