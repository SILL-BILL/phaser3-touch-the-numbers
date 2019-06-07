/// <reference path="phaser-3.17.0/phaser.d.ts"/>

/**
	@summary 設定クラス
*/
class Config
{
	/**
		@summary Canvasの幅
	*/
	public static readonly CANVAS_WIDTH:number = 1280;
	/**
		@summary Canvasの高さ
	*/
	public static readonly CANVAS_HEIGHT:number = 960;
	/**
		@summary Scene Names
	*/
	public static readonly SceneNames = {
		'Start':'StartScene'
	}
	/**
		@summary コンストラクタ
	*/
	constructor(){}
}

/**
	@summary スタートシーンクラス
*/
class StartScene extends Phaser.Scene
{

	/**
		@summary メインクラスを格納するプロパティ
	*/
	private m_Main:Main;

	/**
		@summary コンストラクタ
	*/
	constructor(_main:Main)
	{
		super({ key: Config.SceneNames.Start });
		this.m_Main = _main;
	}

	/**
		@summary プリロード処理
	*/
	public preload():void
	{

	}
	/**
		@summary 生成処理
	*/
	public create():void
	{

	}
	/**
		@summary 更新処理
	*/
	public update(_time, _delta):void
	{

	}
}

/**
	@summary メインクラス
*/
class Main
{

	public m_PhaserGameConfig:Config;
	public m_PhaserGame:Phaser.Game;

	/**
		@summary コンストラクタ
	*/
	constructor(_canvasParent:HTMLElement)
	{

	}
}