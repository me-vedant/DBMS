/*******************************************
Statement - Displaying values with specific width in printf()
Written For - PRE-CAT COURSE by CCATPREPARATION.COM
********************************************/
#include<stdio.h>
int main()
{
char ch; int i;  float f; double d; long l;

/* Reading values using scanf() */
printf("Reading the values - \n");

printf("Enter a char value : ");
scanf("%c",&ch);	/* Reading a char value with format specifier %c */

printf("Enter an int value : ");
scanf("%d",&i);		/* Reading an int value with format specifier %d */

printf("Enter a long value : ");
scanf("%ld",&l);	/* Reading an long value with format specifier %ld */

printf("Enter a float value : ");
scanf("%f",&f); 	/* Reading an float value with format specifier %f */

printf("Enter a double value : ");
scanf("%lf",&d);	/* Reading an double value with format specifier %lf */


/* Displaying values using printf() */
printf("Display the values you've entered - \n");
 
/* Displaying a char value with format specifier %c and width of 10 characters  */
printf("The char value you entered : %10c \n", ch);
 

/* Displaying an int value with format specifier %d */
printf("The int value you entered : %-7d int \n", i);
 

/* Displaying a long value with format specifier %ld */
printf("The long value you entered : %5ld \n", l);
 

/* Displaying a float value with format specifier %f */
printf("The float value you entered : %10f \n", f);
 

/* Displaying a double value with format specifier %lf */
printf("The double value you entered : %2lf \n", d);

return 0;
}
 