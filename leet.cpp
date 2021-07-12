#include<iostream>
using namespace std;
int arr[20][20];
long int uniqueBinaryTree(int lvl,int edge){
        if(edge<=0) return 1;
        if(edge==1) return 2;
        if(arr[lvl][edge]!=-1)
            return arr[lvl][edge];
        long int ways=0;
        for(int i=0;i<=edge;i++)
            ways+=uniqueBinaryTree(lvl+1,i-1)*uniqueBinaryTree(lvl+1,edge-i-1);                                                          
        return arr[lvl][edge]=ways;
}
int main(){
    for(int i=0;i<20;++i)
        for(int j=0;j<20;++j)
            arr[i][j]=-1;
    cout<<uniqueBinaryTree(0,18);
}