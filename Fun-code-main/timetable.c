#include<stdio.h>
int main(){
    char *a[7][5]={
        {"Dates","Days","lec_1", "Lec_2", "Lec_3"},
        {"Day_1","Mon","his", "phy","geo"},
        {"Day_2","Tues","maths","sci","hist"},
        {"Day_3","Wed","phy","geo","sci"},
        {"Day_4","thurs","draw","Art","Alg"},
        {"Day_5","Fri","mar","skill","data"},
        {"Day_6","sat","maths", "hist", "pistry"},
        
        
    };

    for(int i=0; i<7;i++){
        for(int j=0; j<5;j++){
            printf("%s\t",a[i][j]);
        }
        printf("\n");
    }
    return 0;
}