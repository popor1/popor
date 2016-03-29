using UnityEngine;
using System.Collections;

public class GamePlay : MonoBehaviour
{
    private int cols, rows;                                                                         //가로, 세로 배열(5 X 8배열)
    private int[,] aBlock, aGrid;                                                                  //블록 배열
    private int blockCollor;                                                                        //블록 컬러
    private float blockW, blockH;                                                                   //블록 크기
    private bool bPlayerCanClick;                                                                   //플레이어 마우스 클릭
    private float playerMouseX, playerMouseY;                                                       //플레이어의 마우스 좌표
    private int score;                                                                              //점수
    private Texture2D blockBlank, blockBattery, blockJewelry, blockFire, blockGear, blockGold;      //블록의 종류(빈 공간, 배터리, 보석, 불, 기어, 금)
    private static int BLANKBLOCK = 0, BATTERYBLOCK = 1, JEWELRYBLOCK = 2,
                        FIREBLOCK = 3, GEARBLOCK = 4, GOLDBLOCK = 5;                                //블록의 종류에 대한 상수화

    void Awake()
    {                                                                                   //게임이 시작 되기전에 초기화 작업을 말한다.(정확히는 start함수전에 Init과 비슷하게 변수의 초기값을 지정해주는 함수)
        cols = 5;
        rows = 8;

        blockCollor = 5;
        blockW = 20;
        blockH = 20;

        playerMouseX = 0;
        playerMouseY = 0;
        /*
        BLANKBLOCK = 0;
        BATTERYBLOCK = 1;
        JEWELRYBLOCK = 2;
        FIREBLOCK = 3;
        GEARBLOCK = 4;
        GOLDBLOCK = 5;
        */
        blockBlank = Resources.Load("BlankBlock") as Texture2D;
        blockBattery = Resources.Load("BatteryBlock") as Texture2D;
        blockJewelry = Resources.Load("FireBlock(1)") as Texture2D;
        blockFire = Resources.Load("GearBlock") as Texture2D;
        blockGear = Resources.Load("GoldBlock") as Texture2D;
        blockGold = Resources.Load("JewelryBlock") as Texture2D;

        aBlock = new int[10, 10];
        for (int i = 0; i < cols; ++i)
        {
            // aBlock = new int[i];
            for (int j = 0; j < rows; ++j)
            {
                //aBlock = new int[i, j];
                int randNum = Random.Range(1, blockCollor + 1);
                aBlock[i, j] = randNum;
            }
        }
    }

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        playerMouseX = (Input.mousePosition.x) / 50;
        playerMouseY = (Screen.height - Input.mousePosition.y) / 50;
        OnMouseDown();
    }

    void BuildPuzzle()
    {
        GUILayout.BeginVertical();
        for (int i = 0; i < cols; i++)
        {
            GUILayout.BeginHorizontal();
            for (int j = 0; j < rows; j++)
            {
                switch (aBlock[i, j])
                {
                    case 0:
                        GUILayout.Button(blockBlank, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        break;
                    case 1:
                        GUILayout.Button(blockBattery, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        break;
                    case 2:
                        GUILayout.Button(blockJewelry, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        break;
                    case 3:
                        GUILayout.Button(blockFire, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        break;
                    case 4:
                        GUILayout.Button(blockGear, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        break;
                    case 5:
                        GUILayout.Button(blockGold, GUILayout.Width(blockW), GUILayout.Height(blockH));
                        //GUILayout.Button(blockGold, GUILayout.Width(blockW));
                        break;
                }
            }
            GUILayout.EndHorizontal();
        }
        GUILayout.EndVertical();
    }

    void OnGUI()
    {
        GUILayout.BeginArea(new Rect(0, 0, Screen.width, Screen.height));
        BuildPuzzle();
        GUILayout.EndArea();
    }

    void OnMouseDown()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("들어옴");
            bPlayerCanClick = true;
        }
    }
}
