//
//  Prettify.h
//  Euler-Net
//
//  Created by John Pearson on 5/12/17.
//  Copyright © 2017 John Pearson. All rights reserved.
//

#ifndef Prettify_h
#define Prettify_h

#include<string>


std::string prettify(int num){
    std::string snum = std::to_string(num);
    long i = snum.length();
    for (int j = 1; j < (double)i/3; j++){
        snum = snum.insert(snum.length()-3 * j - j + 1,",");
    }
    return snum;
}

#endif /* Prettify_h */
