//
//  Prob1.h
//  Euler-Net
//
//  Created by John Pearson on 5/12/17.
//  Copyright © 2017 John Pearson. All rights reserved.
//

#ifndef Prob1_h
#define Prob1_h

int prob1(){
    int num = 0;
    for (int i = 0; i < 1000; i++) {
        if ((i % 5) == 0 || (i % 3) == 0) {
            num += i;
        }
    }
    return num;
}
#endif /* Prob1_h */
