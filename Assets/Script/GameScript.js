
var cols : int = 6;	
var rows : int = 6;	
var totalBlocks : int = cols * rows;

var blockColor : int = 5;

//var BLOCKBLANK : int = 0;

var count : int = 0;

/*
var matchesNeededToWin : int = totalCards * 0.5;
var matchesMade : int = 0;
*/

var blockW : int = 80;	
var blockH : int = 80;	

public var aBlock : Array;		
var aGrid : Array;		
var aBlocklist : ArrayList;

var playerCanClick : boolean;	//flag to prevent the player from clicking buttons
var playerMouseX : int;
var playerMouseY : int;

var playerHasWon : boolean = false;

class Block extends System.Object{
	//var isFaceUp : boolean = false;
	
	var BLOCKBLANK :  int = 0;
	var BLOCKRED : int = 1;
	var BLOCKBLUE : int = 2;
	var BLOCKYELLOW : int = 3;
	
	var isMatched : boolean = false;
	
	var playerBlockClick : boolean = false;
	
	var img : String;
	var id : int;
	
	function Block(){
		img = "block";
	}
	function Block(img:String){
		this.img = img;
	}
	function Block(img:String, id:int){
		this.img = img;
		this.id = id;
	}
}

function Start () {
	playerCanClick = true;	
	
	aBlock = new Array();	
	aGrid = new Array();
	BlockBuild();
	
	//Debug.Log(aBlock.length);
	
	for(var i = 0; i<rows; i++)
	{
		aGrid[i] = new Array();	
		for(var j = 0; j<cols; j++)
		{
			var someNum:int = Random.Range(0, aBlock.length);
			aGrid[i][j] = aBlock[someNum];
			Debug.Log(someNum);
			aBlock.RemoveAt(someNum);
		}
	}
	
	//DeleteCount();
	

}


function OnGUI () {
	GUILayout.BeginArea(Rect(0, 0, Screen.width, Screen.height));
	BuildGrid();
	if(playerHasWon){
		BuildWinPrompt();
	}
	GUILayout.EndArea();
}

function BuildGrid(){
	GUILayout.BeginVertical();
	//GUILayout.FlexibleSpace();
	var i : int;
	var j : int;
	
	for(i=0; i<rows; i++)
	{
		GUILayout.BeginHorizontal();
		//GUILayout.FlexibleSpace();
		for(j=0; j<cols; j++)
		{
			var block : Object = aGrid[i][j];
			var img : String;
			
			if(block.isMatched){
				img = "block";
			}
			GUI.enabled = !block.isMatched;
			
			if(GUILayout.Button(Resources.Load(block.img), GUILayout.Width(blockW)))
			{
				//Debug.Log(empty_block.img);
				DeleteCount(block);
			}
			GUI.enabled = true;
		}
		//GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	}
	//GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
}

function BlockBuild()
{
	var totalBlock:int = 3;

	//var blockIndex:int;
	var block:Object;
	var id:int = 0;
	
	for(i = 0; i<12; i++)
	{
		for(j= 0; j<totalBlock; j++)
		{
			block = new Block("block"+(j+1),id);
			aBlock.Add(block);
		}
		id++;
		//var aBlockColors:Array = ["Red", "Yellow", "Green", "White", "Blue", "Black"];
		
		//var someNum:int = Random.Range(0, aBlockColors.length);
		//var theBlockColorName:String = aBlockColors[someNum];
	}
}



function DeleteCount(block : Block)
{
	var checkBlock : String;
	
	block.playerBlockClick = true;
	checkBlock = block.img;
	//Debug.Log("확인");
	
	if(checkBlock == "block1")
	{
		block.isMatched = true;
		DeleteBlock(playerMouseX, playerMouseY);
		//DeleteBlock(playerMouseX, playerMouseY, checkBlock);
		//Debug.Log("확인");
	}
	//block.isMatched = true;
	//block.img = "block1";

}

function NodeCount()
{
	count = 0;
	return count;
	
}

function DeleteBlock(x:int , y:int)
{
	var arrayBlock : Array;
	var img : String;
	for( i = 0; i < 5; i++){
		arrayBlock[i] = new Array();
		for( j = 0; j<5; j++)
		{	arrayBlock[i][j] =0;}
	}
	img = aGrid[x][y];
	
	if(img==aGrid[x+1][y])
	{
		DeleteBlock(x+1, y);
	}
	
	if(img==aGrid[x][y+1])
	{
		DeleteBlock(x, y+1);
	}
	
	if(img==aGrid[x-1][y])
	{
		DeleteBlock(x-1, y);
	}
	
	if(img==aGrid[x][y-1])
	{
		DeleteBlock(x, y-1);
	}
	
	Debug.Log(img);
	
	
}
/*
function DeleteBlock(x:int , y:int, a:String)
{
	
	//Debug.Log(x);
	//Debug.Log(y);
	
	if(a==aBlocklist[x][y])
	{
		DeleteBlock(x+1, y, a);
	}
	
	
	
}
*/

function Update()
{
	
	playerMouseX = (Input.mousePosition.x)/80;
	playerMouseY = (Input.mousePosition.y)/80;
}



function BuildWinPrompt(){
	var winPromptW : int = 100;
	var winPromptH : int = 90;
	
	var halfScreenW : float = Screen.width*0.5;
	var halfScreenH : float = Screen.height*0.5;
	
	var halfPromptW : int = winPromptW*0.5;
	var halfPromptH : int = winPromptH*0.5;
	
	GUI.BeginGroup(Rect(halfScreenW-halfPromptW, halfScreenH-halfPromptH, winPromptW, winPromptH));
	GUI.Box (Rect(0, 0, winPromptW, winPromptH), "A Winner is You!!");
	
	if(GUI.Button(Rect(10, 40, 80, 20), "Play Again"))
	{
		//Application.LoadLevel("Title");
	}
	GUI.EndGroup();
}

/*
function randomBlock()
{
	var randNum = Random.Range(1, blockColor);
	return randNum;
}


function FlipCardFaceUp(card : Card){
	card.isFaceUp = true;
	//aCardsFlipped.Add(card);
	if(aCardsFlipped.IndexOf(card) < 0)
	{
		aCardsFlipped.Add(card);
		if(aCardsFlipped.Count == 2)
		{
			playerCanClick = false;
			
			yield WaitForSeconds(0.5);
			if(aCardsFlipped[0].id == aCardsFlipped[1].id)
			{
				aCardsFlipped[0].isMatched = true;
				aCardsFlipped[1].isMatched = true;
				
				matchesMade++;
				if(matchesMade >= matchesNeededToWin){
					playerHasWon = true;
				}
			}
			else
			{
				aCardsFlipped[0].isFaceUp = false;
				aCardsFlipped[1].isFaceUp = false;
				//card.isMatched = false;
			}	
			aCardsFlipped = new ArrayList();
			
			playerCanClick = true;
		}
	}
}
*/
