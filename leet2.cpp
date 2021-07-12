#include<iostream>
#include<vector>
using namespace std;
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x){
        val=x;
        left=right=nullptr;
    }
};
vector<TreeNode*> ans;
bool visited[9];
void constructBST()
{
}
TreeNode* uniqueBinaryTree(int min_val,int max_val,int id){
    if(min_val>max_val) return nullptr;
    for(int i=min_val;i<=max_val;++i)
    {
        
    }
}
int main()
{
    uniqueBinaryTree(3,0);
}

