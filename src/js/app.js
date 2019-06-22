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
        'Start': 'StartScene',
        'Main': 'MainScene'
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
    @summary Mainシーンクラス
*/
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    /**
        @summary コンストラクタ
    */
    function MainScene(_main) {
        var _this = _super.call(this, { key: Config.SceneNames.Main }) || this;
        _this.m_Main = _main;
        return _this;
    }
    /**
        @summary プリロード処理
    */
    MainScene.prototype.preload = function () {
        this.load.atlas('bg', 'src/img/bg/sprite.png', 'src/img/bg/sprite.json');
        this.load.multiatlas('btn-num', 'src/img/btn-num/sprite.json', 'src/img/btn-num/');
        this.load.audio('decision', [
            'src/audio/decision/0.ogg',
            'src/audio/decision/0.mp3'
        ]);
    };
    /**
        @summary 生成処理
    */
    MainScene.prototype.create = function () {
        this.m_BgMain = this.add.image(Config.CANVAS_WIDTH / 2, Config.CANVAS_HEIGHT / 2, 'bg', 'main');
        this.m_BtnNumGroup = this.add.group();
        this.createBtnNum(3, 3);
    };
    /**
        @summary 更新処理
    */
    MainScene.prototype.update = function (_time, _delta) {
    };
    /**
        @summary ナンバーボタンを生成する関数
    */
    MainScene.prototype.createBtnNum = function (_row, _column) {
        var _this = this;
        var btn_width = 320;
        var btn_height = 320;
        var btn_offset_x = btn_width / 2;
        var btn_offset_y = btn_height / 2;
        var b = (Config.CANVAS_WIDTH - (btn_width * _column)) / 2;
        var numList = new Array(_row * _column);
        for (var i = 0; i < numList.length; i++) {
            numList[i] = i + 1;
        }
        for (var i = numList.length - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = numList[i];
            numList[i] = numList[r];
            numList[r] = tmp;
        }
        //ボタンの生成と配置
        var index = 0;
        for (var i = 0; i < _row; i++) {
            var _loop_1 = function (j) {
                var btn = new Phaser.GameObjects.Image(this_1, btn_width * j + btn_offset_x + b, btn_height * i + btn_offset_y + 320, 'btn-num', 'btn-' + numList[index]);
                btn.setInteractive();
                btn.setData('num', numList[index]);
                btn.on('pointerdown', function () {
                    _this.sound.play('decision');
                    btn.setTexture('btn-num', 'btn-' + btn.getData('num') + '-pressed');
                    console.log(btn.getData('num'));
                }, this_1);
                btn.on('pointerup', function () {
                    btn.setTexture('btn-num', 'btn-' + btn.getData('num'));
                }, this_1);
                this_1.m_BtnNumGroup.add(btn, true);
                index++;
            };
            var this_1 = this;
            for (var j = 0; j < _column; j++) {
                _loop_1(j);
            }
        }
    };
    return MainScene;
}(Phaser.Scene));
// class ClassName extends Phaser.GameObjects.Image {
// 	constructor(_scene,_x,_y) {
// 		super();
// 	}
// }
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
            scene: [new MainScene(this)]
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
