//
//  Prob2.h
//  Euler-Net
//
//  Created by John Pearson on 5/12/17.
//  Copyright © 2017 John Pearson. All rights reserved.
//

#ifndef Prob2_h
#define Prob2_h

int prob2() {
    int fib = 1;
    int fibprev = 1;
    int sum = 0;
    while (fib + fibprev < 4000000){
        int temp = fib;
        fib = fib + fibprev;
        fibprev = temp;
        if ((fib % 2) == 0) {
            sum = sum + fib;
        }
    }
    
    return sum;
}

#endif /* Prob2_h */
