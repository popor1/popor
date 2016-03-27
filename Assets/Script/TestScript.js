//#pragma strict
var cols = 5;	
var rows = 8;	

var blockW = 50;	
var blockH = 50;	

var aBlock;
var aGrid;

var bPlayerCanClick = false;
var playerMouseX = 0;
var playerMouseY = 0;

var puzzleColor = 5;
static var score : int = 0;
var scoreCount = 0;

var blockBlank : Texture2D;
var blockBattery : Texture2D;
var blockJewelry : Texture2D;
var blockFire : Texture2D;
var blockGear : Texture2D;
var blockGold : Texture2D;

var BLANKBLOCK = 0;
var BATTERYBLOCK = 1;
var JEWELRYBLOCK = 2;
var FIREBLOCK = 3;
var GEARBLOCK = 4;
var GOLDBLOCK = 5;

function Awake()
{
    
    blockBlank = Resources.Load("BlankBlock");
    blockBattery = Resources.Load("BatteryBlock");
    blockJewelry = Resources.Load("FireBlock(1)");
    blockFire = Resources.Load("GearBlock");
    blockGear = Resources.Load("GoldBlock");
    blockGold = Resources.Load("JewelryBlock"); 

    //var instance : GameObject = Instantiate(Resources.Load("D:/study/TermProject/puzzle_test/Assets/Resources/block", GameObject));
}

function Start()
{
    //scroe = 0;
    aBlock = new Array();
    aGrid = new Array();

    for(var i = 0; i< cols; i++)
    {
        aBlock[i] = new Array();
        for(var j = 0; j<rows; j++)
        {
            var someNum = Random.Range(1, puzzleColor+1);
            aBlock[i][j] = someNum;
        }
    }
    
    
}
function OnGUI()
{
    GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
    GUI.Label(Rect(800, 10, 200, 40), ("Score : " + score));
    BuildPuzzle();
    GUILayout.EndArea();
}


function BuildPuzzle()
{
    GUILayout.BeginVertical();
    for(i = 0; i<cols; i++)
    {
        GUILayout.BeginHorizontal();
        for(j = 0; j<rows ; j++)
        {
            switch(aBlock[i][j])
            {
                case BLANKBLOCK :
                    GUILayout.Button(blockBlank, GUILayout.Width(blockW));
                    break;
                case BATTERYBLOCK :
                    GUILayout.Button(blockBattery, GUILayout.Width(blockW));
                    break;
                case JEWELRYBLOCK :
                    GUILayout.Button(blockJewelry, GUILayout.Width(blockW));
                    break;
                case FIREBLOCK :
                    GUILayout.Button(blockFire , GUILayout.Width(blockW));
                    break;
                case GEARBLOCK :
                    GUILayout.Button(blockGear , GUILayout.Width(blockW));
                    break;
                case GOLDBLOCK :
                    GUILayout.Button(blockGold , GUILayout.Width(blockW));
                    break;
             }
        }
        GUILayout.EndHorizontal();
    }
    GUILayout.EndVertical();
}
function onMouseDown()
{
    if(Input.GetMouseButtonDown(0))
    {
        Debug.Log("들어옴");
        bPlayerCanClick = true;
    }
}
function Update()
{
    playerMouseX = (Input.mousePosition.x) / 50;
    playerMouseY = (Screen.height-Input.mousePosition.y) / 50;
   // var xpos = Input.mousePosition.x; 
    //var ypos = Screen.height - Input.mousePosition.y; 
   // var result = Mathf.Floor(xpos / gridpixels) + Mathf.Floor(ypos / gridpixels)*gidxsquares + 1;
   // Debug.Log(ypos);
    onMouseDown();
}
/*
function BlockSwap(x, y, z)
{
    var tmp = z;
    var SelectBlock1 = aBlock[x][y];

}
*/
function BlockDown()
{
    var tmp = BLANKBLOCK;
    for(var z = 0; z<rows; z++)
    {
        for(var i = 0; i<rows; i++)
        {
            for(var j = rows; j>0; j--)
            {
                if(aBlock[i][j] != BATTERYBLOCK  && aBlock[i][j] != JEWELRYBLOCK  && aBlock[i][j] != FIREBLOCK && aBlock[i][j] != GEARBLOCK  && aBlock[i][j] != GOLDBLOCK  )
                {
                    if(aBlock[i][j] == BLANKBLOCK)
                    {
                        tmp = aBlock[i][j-1];
                        aBlock[i][j-1] = aBlock[i][j];
                        aBlock[i][j] = tmp;
                    }
                }
            }
        }
    }
    BuildPuzzle();
    //Block_Regenerate();
}
/*
function Score()
{
    scroe = 0;
    scoreCount = 0;
    for(var i = 0; i<cols; i++)
    {
       
        for(var j = 0; j<rows ; j++)
        {
            scoreCount = 0;
            if(aBlock[i][j] == BLOCKWALL)
            {
                scoreCount = 100;
            }
            score += scoreCount;
        }
        
    }
    return score;
}

function DeleteBlock(x, y)
{
    bPlayerCanClick = false;
    clickBlockColor = aBlock[x][y];
    if(clickBlockColor!=BLOCKBLANK)
    {
        switch(clickBlockColor)
        {
            case BLOCKRED:
                DeleteCount();
                Score();
                break;
            case BLOCKBLUE:
                DeleteCount();
                Score();
                break;
            case BLOCKYELLOW:
                DeleteCount();
                Score();
                break;
            case BLOCKBLACK:
                DeleteCount();
                Score();
                break;
        }
    }
}

function DeleteCount()
{
    count = 0;
    DeletePredictionBlock(playerMouseY,  playerMouseX);
    return count;
}

function DeletePredictionBlock(x, y)
{
    var nowBlock = aBlock[x][y];

    aBlock[x][y] = BLOCKBLANK;

    count++;

    if(nowBlock==aBlock[x+1][y])
    {
        DeletePredictionBlock(x+1, y);
    }
	
    if(nowBlock==aBlock[x][y+1])
    {
        DeletePredictionBlock(x, y+1);
    }
	
    if(nowBlock==aBlock[x-1][y])
    {
        DeletePredictionBlock(x-1, y);
    }
	
    if(nowBlock==aBlock[x][y-1])
    {
        DeletePredictionBlock(x, y-1);
    }
}
*/