/// <reference path="phaser-3.17.0/phaser.d.ts"/>

/**
	@summary 設定クラス
*/
class Config
{
	/**
		@summary バージョン番号
	*/
	public static readonly VERSION:string = '0.1.0';
	/**
		@summary Canvasの幅
	*/
	public static readonly CANVAS_WIDTH:number = 960;
	/**
		@summary Canvasの高さ
	*/
	public static readonly CANVAS_HEIGHT:number = 1280;
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
		@summary 背景のImageを格納するフィールド
	*/
	private m_BgMain:Phaser.GameObjects.Image;
	/**
		@summary 背景のImageを格納するフィールド
	*/
	private m_Logo:Phaser.GameObjects.Image;
	/**
		@summary 背景のImageを格納するフィールド
	*/
	private m_Copyright:Phaser.GameObjects.Image;
	/**
		@summary 背景のImageを格納するフィールド
	*/
	private m_VersionText:Phaser.GameObjects.Text;
	/**
		@summary 背景のImageを格納するフィールド
	*/
	private m_BtnStart:Phaser.GameObjects.Image;

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
		this.load.image('logo', 'src/img/logo.png');
		this.load.image('copyright', 'src/img/copyright.png');

		this.load.atlas('bg', 'src/img/bg/sprite.png', 'src/img/bg/sprite.json');
		this.load.atlas('btn-common', 'src/img/btn-common/sprite.png', 'src/img/btn-common/sprite.json');

		this.load.audio('decision', [
			'src/audio/decision/0.ogg',
			'src/audio/decision/0.mp3'
		]);
	}
	/**
		@summary 生成処理
	*/
	public create():void
	{
		this.m_BgMain = this.add.image(Config.CANVAS_WIDTH/2,Config.CANVAS_HEIGHT/2,'bg','main');
		this.m_Logo = this.add.image(Config.CANVAS_WIDTH/2,440,'logo');
		this.m_Copyright = this.add.image(Config.CANVAS_WIDTH/2,Config.CANVAS_HEIGHT-50,'copyright');

		this.m_VersionText = this.add.text(
			Config.CANVAS_WIDTH-30,30,
			'Version : '+Config.VERSION,
			{fontFamily:'Arial', fontSize:28, color:'#f5f5f5'}
		).setOrigin(1, 0);

		this.m_BtnStart = this.add.image(Config.CANVAS_WIDTH/2,Config.CANVAS_HEIGHT/2+340,'btn-common','0000-start').setInteractive();
		this.m_BtnStart.on('pointerdown', () =>
		{
			this.sound.play('decision');
			this.m_BtnStart.setTexture('btn-common','0001-start-pressed');
		}, this);
		this.m_BtnStart.on('pointerup', () =>
		{
			this.m_BtnStart.setTexture('btn-common','0000-start');
		}, this);


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
		this.m_PhaserGameConfig = {
			type: Phaser.AUTO,
			scale :{
				parent: _canvasParent,
				mode: Phaser.Scale.FIT,
				width: Config.CANVAS_WIDTH,
				height: Config.CANVAS_HEIGHT,
			},
			scene: [new StartScene(this)]
		};
		this.m_PhaserGame = new Phaser.Game(this.m_PhaserGameConfig);
	}
}


var main:Main;
window.onload = () => {
	var canvasParent : HTMLElement = <HTMLElement>document.getElementById('CanvasParent');
	main = new Main(canvasParent);
}