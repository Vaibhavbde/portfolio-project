#include<stdio.h>

int main(){
    int x,y;
    printf("Enter the no. of rows and columns you want:\n");
    scanf("%d %d",&x,&y);

    int a[x][y];
    
    for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            scanf("%d",&a[i][j]);
        }
    }

    for(int i=0;i<x;i++){
        for(int j=0;j<y;j++){
            printf("%d ",a[i][j]);
        }
        printf("\n");
    }

    return 0;
}