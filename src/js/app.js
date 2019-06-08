/// <reference path="phaser-3.17.0/phaser.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
    @summary 設定クラス
*/
var Config = /** @class */ (function () {
    /**
        @summary コンストラクタ
    */
    function Config() {
    }
    /**
        @summary バージョン番号
    */
    Config.VERSION = '0.1.0';
    /**
        @summary Canvasの幅
    */
    Config.CANVAS_WIDTH = 960;
    /**
        @summary Canvasの高さ
    */
    Config.CANVAS_HEIGHT = 1280;
    /**
        @summary Scene Names
    */
    Config.SceneNames = {
        'Start': 'StartScene'
    };
    return Config;
}());
/**
    @summary スタートシーンクラス
*/
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    /**
        @summary コンストラクタ
    */
    function StartScene(_main) {
        var _this = _super.call(this, { key: Config.SceneNames.Start }) || this;
        _this.m_Main = _main;
        return _this;
    }
    /**
        @summary プリロード処理
    */
    StartScene.prototype.preload = function () {
        this.load.image('logo', 'src/img/logo.png');
        this.load.image('copyright', 'src/img/copyright.png');
        this.load.atlas('bg', 'src/img/bg/sprite.png', 'src/img/bg/sprite.json');
        this.load.atlas('btn-common', 'src/img/btn-common/sprite.png', 'src/img/btn-common/sprite.json');
        this.load.audio('decision', [
            'src/audio/decision/0.ogg',
            'src/audio/decision/0.mp3'
        ]);
    };
    /**
        @summary 生成処理
    */
    StartScene.prototype.create = function () {
        var _this = this;
        this.m_BgMain = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT / 2, 'bg', 'main');
        this.m_Logo = this.add.image(Config.CANVAS_WIDTH / 2, 440, 'logo');
        this.m_Copyright = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT - 50, 'copyright');
        this.m_VersionText = this.add.text(Config.CANVAS_WIDTH - 30, 30, 'Version : ' + Config.VERSION, { fontFamily: 'Arial', fontSize: 28, color: '#f5f5f5' }).setOrigin(1, 0);
        this.m_BtnStart = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT / 2 + 340, 'btn-common', '0000-start').setInteractive();
        this.m_BtnStart.on('pointerdown', function () {
            _this.sound.play('decision');
            _this.m_BtnStart.setTexture('btn-common', '0001-start-pressed');
        }, this);
        this.m_BtnStart.on('pointerup', function () {
            _this.m_BtnStart.setTexture('btn-common', '0000-start');
        }, this);
    };
    /**
        @summary 更新処理
    */
    StartScene.prototype.update = function (_time, _delta) {
    };
    return StartScene;
}(Phaser.Scene));
/**
    @summary メインクラス
*/
var Main = /** @class */ (function () {
    /**
        @summary コンストラクタ
    */
    function Main(_canvasParent) {
        this.m_PhaserGameConfig = {
            type: Phaser.AUTO,
            scale: {
                parent: _canvasParent,
                mode: Phaser.Scale.FIT,
                width: Config.CANVAS_WIDTH,
                height: Config.CANVAS_HEIGHT
            },
            scene: [new StartScene(this)]
        };
        this.m_PhaserGame = new Phaser.Game(this.m_PhaserGameConfig);
    }
    return Main;
}());
var main;
window.onload = function () {
    var canvasParent = document.getElementById('CanvasParent');
    main = new Main(canvasParent);
};
