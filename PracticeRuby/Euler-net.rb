#Make numbers into strings as commas
def comma(x)
  y = (x.to_s).split('')
  n = y.length
  out = y[0]
  for i in 1...n
    out+=',' if (n-i)%3 == 0
    out+=y[i]
  end
  out
end


#Problem 1: Multiples of 3 and 5
#As a function...
puts "Problem 1: Multiples of 3 and 5"
def multiples35(n)
  sum = 0
  for i in 1...n
    if i%3==0
      sum+=i
    elsif i%5==0
      sum+=i
    end
  end
  puts "The sum of the multiples of 3 and 5 less than #{comma(n)} is #{comma(sum)}"
end

multiples35(1000)
puts ''

#Second Method - by direct mathematical computation
def multiples35v2(n)
  n-=1
  sum2 = 3*(n/3.floor)*(n/3.floor+1)/2+5*(n/5.floor)*(n/5.floor+1)/2-15*(n/15.floor)*(n/15.floor+1)/2
  puts "The sum of the multiples of 3 and 5 less than #{comma(n+1)} is #{comma(sum2)}"
end

#Problem 2: Even Fibonacci Numbers
puts "Problem 2: Even Fibonacci Numbers"
def even_fibonacci(n)
  sum = 0
  prev = 1
  cur = 2
  while cur <= n
    sum += cur if cur%2 == 0
    cur += prev
    prev = cur - prev #since cur has already been updated
  end
  puts "The sum of the even Fibonacci numbers less than #{comma(n)} is #{comma(sum)}"
end

even_fibonacci(4000000)
puts ''

#Problem 3: Largest Prime Factor
puts "Problem 3: Largest Prime Factor"
#First a function to determine if something is prime
def is_prime?(num)
  n = Math.sqrt(num).to_i #This is as high as our loop needs to go to find factors
  factors = 0
  for i in 1..n
    factors+=1 if num%i == 0
  end
  factors == 1 #That is, 1 is the only factor up to sqrt(num)
end

def prime_factor(num)
  n = Math.sqrt(num).to_i #This is as high as our loop will go to find factors
  largest = 1
  for i in 2..n
    if num%i == 0 && is_prime?(i)
      largest = [largest,i,largest/i].max
    end
  end
  puts "The largest prime factor of #{comma(num)} is #{comma(largest)}."
end

prime_factor(600851475143)
puts ''

#Problem 4: Largest Palindrome Product
puts "Problem 4: Largest Palindrome Product"
def is_palindrome?(num)
  num.to_s.split('').reverse.join.to_i == num
end

def palindrome_product(n)
  max = 0
  for i in (10**(n-1))...(10**n)
    for j in (10**(n-1))...(10**n)
      k = i*j
      max = k if k > max && is_palindrome?(k)
    end
  end
  puts "The maximum palindrome that is a product of #{n}-digit numbers is #{comma(max)}"
end

palindrome_product(3)
puts ''

#Problem 5: Smallest Multiple
puts "Problem 5: Smallest Multiple"
#This is a brute force way
def smallest_multiple(n,start)
  no_factor = true
  cur = start
  while no_factor
    no_factor = false
    for i in 1..n #4 is the first non-prime
      if cur%i != 0 #the current number is not divisible by something <=n
        no_factor = true #we haven't found our factor
        cur+=1 #increase our current value
        i=n #break the for loop
      end
    end
  end
  cur
end

def smallest_multiple_quick(n)
  start = smallest_multiple(2,1)
  for i in 2..n
    start = smallest_multiple(i, start)
  end
  puts "The smallest multiple of the numbers 1,...,#{n} is #{comma(start)}"
end

smallest_multiple_quick(10)
puts ''

#Problem 6: Sum square difference
puts "Problem 6: Sum Square Difference"

def squares_difference(n)
  sum_squares = 0
  square_sum = 0
  for i in 1..n
    sum_squares += i**2
  end
  square_sum = (n*(n+1)/2)**2
  diff = square_sum - sum_squares
  puts "The difference between (1+...+#{n})\u00b2 and 1\u00b2+...+#{n}\u00b2 is #{comma(diff)}."
end

squares_difference(100)

puts ''

#Problem 7: 10,001st prime
puts 'Problem 7: 10,001st Prime'

def nth_prime(n)
  i = 1
  prime = 1
  while i <= n
    keep = true
    j = prime
    while keep
      j+=1
      keep = !is_prime?(j)
    end
    prime = j
    i+=1
  end
  puts "#{comma(prime)} is the #{comma(n)} prime."
end

puts nth_prime(10001)
