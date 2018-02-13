#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define STEP 10

// Print Celsius conversion for several Fahrenheit values

int main() {
        float fahr, celsius;

        for(int i = LOWER; i <= UPPER; i += STEP) {
                fahr = i;
                celsius = (5.0/9.0) * (fahr - 32);
                printf("%3.0f \t %6.2f\n", fahr, celsius);
        }
        return 0;
}
