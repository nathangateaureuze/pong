class Tableau1 extends Phaser.Scene{

    preload()
    {
        this.load.image("carre","assets/carre.png")
        this.load.image("cercle","assets/cercle.png")
    }

    create()
    {
        let me = this;

        this.hauteur=500
        this.largeur=1000

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

        this.touches()
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
        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette)
        positionRelativeRaquette = positionRelativeRaquette*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * 1000);
    }

    out()
    {
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
    }


    update()
    {

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
            this.out()
        }
        if (this.balle.x <=0)
        {
            this.out()
        }
    }
}
