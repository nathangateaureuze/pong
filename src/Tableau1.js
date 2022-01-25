class Tableau1 extends Phaser.Scene{

    preload()
    {
        this.load.image("carre","assets/carre.png")
        this.load.image("cercle","assets/cercle.png")
        this.load.image("fond","assets/fond.png")

        this.load.image("patch","assets/patch.png")

        this.load.image("bumper","assets/bumper.png")

        //flèches
        this.load.image('f_gauche_0', "assets/flèches mouvements/1_0.png");
        this.load.image('f_gauche_1', "assets/flèches mouvements/1_1.png");
        this.load.image('f_droit_0', "assets/flèches mouvements/2_0.png");
        this.load.image('f_droit_1', "assets/flèches mouvements/2_1.png");

        //voyant *2
        this.load.image('v_x2_0', "assets/voyants/2_0.png");
        this.load.image('v_x2_1', "assets/voyants/2_1.png");
        //voyant *3
        this.load.image('v_x3_0', "assets/voyants/3_0.png");
        this.load.image('v_x3_1', "assets/voyants/3_1.png");

    }

    create()
    {
        let me = this;
        this.multiplicateur=1;

        this.hauteur=500
        this.largeur=1000

        this.fond = this.add.image(0,0,"fond").setOrigin(0,0)

        this.patch1 = this.physics.add.image(250,375,"patch").setOrigin(0,0)
        this.patch1.body.setAllowGravity(false)
        this.patch1.setImmovable(true)

        this.patch2 = this.physics.add.image(675,50,"patch").setOrigin(0,0)
        this.patch2.body.setAllowGravity(false)
        this.patch2.setImmovable(true)

        this.voyant1 = this.add.sprite(this.largeur/2-50,this.hauteur/2,"v_x3_0")
        this.voyant2 = this.add.sprite(this.largeur/2+50,this.hauteur/2,"v_x2_0")

        this.flecheGauche1 = this.add.sprite(150,this.hauteur/2,"f_gauche_0")
        this.flecheGauche2 = this.add.sprite(250,this.hauteur/2,"f_gauche_0")
        this.flechedroit1 = this.add.sprite(725,this.hauteur/2,"f_droit_0")
        this.flechedroit2 = this.add.sprite(825,this.hauteur/2,"f_droit_0")

        //animation des flèches quand multiplicateur actif
        this.anims.create({
            key: 'fg1',
            frames:[
                    {key:'f_gauche_0'},
                    {key:'f_gauche_1'},
                    ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'fg2',
            frames:[
                {key:'f_gauche_1'},
                {key:'f_gauche_0'},
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'fd1',
            frames:[
                {key:'f_droit_0'},
                {key:'f_droit_1'},
            ],
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'fd2',
            frames:[
                {key:'f_droit_1'},
                {key:'f_droit_0'},
            ],
            frameRate: 2,
            repeat: -1
        });

        this.haut = this.physics.add.image(0,-20,"carre").setOrigin(0,0)
        this.haut.setDisplaySize(this.largeur,20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true)

        this.bas = this.physics.add.image(0,this.hauteur,"carre").setOrigin(0,0)
        this.bas.setDisplaySize(this.largeur,20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true)

        this.gauche = this.physics.add.image(30,this.hauteur/2-50,"carre").setOrigin(0,0)
        this.gauche.setDisplaySize(20,100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)

        this.droite = this.physics.add.image(this.largeur-50,this.hauteur/2-50,"carre").setOrigin(0,0)
        this.droite.setDisplaySize(20,100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)

        this.balle = this.physics.add.image(this.largeur/2,this.hauteur/2,"cercle").setOrigin(0,0)
        this.balle.setDisplaySize(20,20)
        this.balle.setBounce(1.5,1.5)
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
        this.balle.body.setMaxVelocity(300)
        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.bas)
        this.physics.add.collider(this.balle,this.gauche,function(){me.rebond(me.gauche)});
        this.physics.add.collider(this.balle,this.droite,function(){me.rebond(me.droite)});
        this.physics.add.overlap(this.patch1,this.balle, function(){me.patch(me.patch1)});
        this.physics.add.overlap(this.patch2,this.balle, function(){me.patch(me.patch2)});

        this.bumper1 = this.physics.add.image(325,75,"bumper").setOrigin(0,0)
        this.bumper1.body.setAllowGravity(false)
        this.bumper1.setImmovable(true)
        this.physics.add.collider(this.bumper1,this.balle)

        this.bumper2 = this.physics.add.image(600,350,"bumper").setOrigin(0,0)
        this.bumper2.body.setAllowGravity(false)
        this.bumper2.setImmovable(true)
        this.physics.add.collider(this.bumper2,this.balle)

        this.joueurGauche = new Jouer("Joueur 1","joueurGauche")
        this.joueurDroite = new Jouer("Joueur 2","joueurDroite")

        this.touches()
        this.out()

    }

    //vitesses des raquettes
    touches()
    {
        let me=this;

        //touches enfoncées
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.vitesseGauche = 1
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.vitesseGauche = -1
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.vitesseDroite = 1
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.vitesseDroite = -1
                    break;
            }
        });
        //touches relachées
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.vitesseGauche = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.vitesseGauche = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.vitesseDroite = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.vitesseDroite = 0
                    break;
            }
        });
    }

    rebond(raquette)
    {
        console.log("touche ",raquette)
        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette)
        positionRelativeRaquette = positionRelativeRaquette*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * 1000);
    }


    patch(patche)
    {
        if (patche === this.patch1)
        {
            this.multiplicateur = 3;
            setTimeout(() => {this.resettimer()}, 5000);
        }
        else
        {
            this.multiplicateur = 2;
            setTimeout(() => {this.resettimer()}, 5000);
        }
    }

    resettimer()
    {
        this.multiplicateur = 1;
    }


    gagnation(joueur)
    {
        joueur.score = joueur.score + this.multiplicateur;
        this.multiplicateur=1;
        this.out()
    }

    out()
    {
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.balle.setVelocityX(Math.random()>0.5?-100:100)
        this.balle.setVelocityY(Math.random()>0.5?-100:100)
    }

    update()
    {
        //clignotement des flèches si multiplicateur actif
        if(this.multiplicateur!=1)
        {
            this.flecheGauche1.anims.play('fg1',true)
            this.flecheGauche2.anims.play('fg2',true)
            this.flechedroit2.anims.play('fd1',true)
            this.flechedroit1.anims.play('fd2',true)
        }
        else
        {
            this.flecheGauche1.anims.stop('fg1')
            this.flecheGauche2.anims.stop('fg2')
            this.flechedroit2.anims.stop('fd1')
            this.flechedroit1.anims.stop('fd2')
            this.flecheGauche1.setTexture('f_gauche_0')
            this.flecheGauche2.setTexture('f_gauche_0')
            this.flechedroit1.setTexture('f_droit_0')
            this.flechedroit2.setTexture('f_droit_0')
        }

        //voyants de multiplicateur de score
        if(this.multiplicateur==1)
        {
            this.voyant1.setTexture('v_x3_0')
            this.voyant2.setTexture('v_x2_0')
        }
        else
        {
            if(this.multiplicateur==2)
            {
                this.voyant1.setTexture('v_x3_0')
                this.voyant2.setTexture('v_x2_1')
            }
            else
            {
                this.voyant1.setTexture('v_x3_1')
                this.voyant2.setTexture('v_x2_0')
            }
        }

        //déplacement des raquettes
        if(this.vitesseGauche === 1 && this.gauche.y>0)
        {
            this.gauche.setPosition(this.gauche.x,this.gauche.y-5)
        }
        if(this.vitesseGauche === -1 && this.gauche.y<this.hauteur-100)
        {
            this.gauche.setPosition(this.gauche.x,this.gauche.y+5)
        }

        if(this.vitesseDroite === 1 && this.droite.y>0)
        {
            this.droite.setPosition(this.droite.x,this.droite.y-5)
        }
        if(this.vitesseDroite === -1 && this.droite.y<this.hauteur-100)
        {
            this.droite.setPosition(this.droite.x,this.droite.y+5)

        }

        //sortie de balle
        if (this.balle.x>=this.largeur)
        {
            this.gagnation(this.joueurGauche)
        }
        if (this.balle.x <=0)
        {
            this.gagnation(this.joueurDroite)
        }
        console.log(this.timer)

    }
}
