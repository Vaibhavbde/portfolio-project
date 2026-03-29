#include<stdio.h>
int main(){
    int a[3][3], b[3][3], add[3][3], sub[3][3];
    
    printf("Enter elements of first matrix:\n");
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            scanf("%d", &a[i][j]);
        }
    }

    printf("Enter the elements of second matrix:\n");
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            scanf("%d", &b[i][j]);
        }
    }

    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            add[i][j]=0;
            add[i][j]=a[i][j]+b[j][i];
        }
    }
    
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            sub[i][j]=0;
            sub[i][j]=a[i][j]-b[j][i];
        }
    } 
    printf("\nResult of Addition:\n");
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            printf("%d ", add[i][j]); 
        }
        printf("\n");
    }
    printf("\nResult of Subtraction:\n");
    for(int i=0; i<3; i++){
        for(int j=0; j<3; j++){
            printf("%d ", sub[i][j]);
        }
        printf("\n");
    }
  
    
    return 0;
}