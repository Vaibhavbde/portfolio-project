#include<stdio.h>
int main(){
    int a[3][3],b[3][3],result[3][3];

    printf("Enter Matrix 1:\n");
    for(int x=0; x<3; x++){
        for(int y=0; y<3; y++){
            scanf("%d",&a[x][y]);
        }
    }

    printf("Enter Matrix 2:\n");
    for(int x=0; x<3; x++){
        for(int y=0; y<3; y++){
            scanf("%d",&b[x][y]);
        }
    }

    for(int x=0; x<3; x++){
        for(int y=0; y<3; y++){
            result[x][y]=0;
            for(int z=0; z<3; z++){
                result[x][y]+=a[x][z]*b[z][y];
            }
        }
    }

    for(int x=0; x<3; x++){
        for(int y=0; y<3; y++){
            printf("%d ",result[x][y]);
        }
        printf("\n");
    }

    return 0;
}