//
//  main.cpp
//  Euler-Net
//
//  Created by John Pearson on 5/10/17.
//  Copyright © 2017 John Pearson. All rights reserved.
//

#include<string>
#include<iostream>
#include "Prob1.h"
#include "Prob2.h"
#include "Prettify.h"
using namespace std;

int main()
{
    cout << "Which problem? ";
    string prob;
    cin >> prob;
    cout << "\n";
    switch (std::stoi( prob )) {
        case 1: {
            cout << "Multiples of 3 and 5:\n";
            
            cout << prettify(prob1()) << " is the sum of all the multiples of 3 and 5 below 1000.";
            break;
        }
        case 2: {
            cout << "Even Fibonacci Numbers:\n";
            
            cout << prettify(prob2()) << " is the sum of all the even Fibonacci terms less than 4,000,000.";
            break;
        }
        case 3: {

        }
        default: {
            cout << "Not a valid problem.";
            break;
        }
    }
    cout << "\n\n";
    return 0;
}
