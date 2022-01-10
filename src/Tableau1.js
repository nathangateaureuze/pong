class Tableau1 extends Phaser.Scene{

    preload()
    {
        this.load.image("carre","assets/carre.png")
        this.load.image("cercle","assets/cercle.png")
    }

    create()
    {

        this.hauteur=500
        this.largeur=1000

        this.gauche = this.physics.add.image(0,this.hauteur/2,"carre").setOrigin(0,0)
        this.gauche.setDisplaySize(20,100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)

        this.droite = this.physics.add.image(this.largeur-20,this.hauteur/2,"carre").setOrigin(0,0)
        this.droite.setDisplaySize(20,100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)

        this.balle = this.physics.add.image(this.largeur/2,this.hauteur/2,"cercle").setOrigin(0,0)
        this.balle.setDisplaySize(20,20)
        this.balle.setBounce(1.5,1.5)
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
        this.balle.body.setMaxVelocityY(500)

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
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.vitesseGauche = 1
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.vitesseGauche = -1
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.vitesseDroite = 1
                    console.log(me.vitesseDroite)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.vitesseDroite = -1
                    console.log(me.vitesseDroite)
                    break;
            }
        });
    }

    update()
    {

        this.vitesseDroite = 0;
        this.vitesseGauche = 0;

        if(this.balle.y >= this.hauteur)
        {
            this.balle.y = 0
        }

        if(this.balle.x > this.largeur)
        {
            this.balle.x = this.largeur
        }
        if(this.balle.x < 0)
        {
            this.balle.x = 0
        }

        //déplacement des raquettes
        if(this.vitesseGauche = 1)
        {
            if(this.gauche.x >= 50)
            {
                this.gauche.setPosition(this.gauche.x,this.gauche.y-10)
            }
        }
        if(this.vitesseGauche = -1)
        {
            if(this.gauche.x <= this.hauteur)
            {
                this.gauche.setPosition(this.gauche.x,this.gauche.y+10)
            }
        }

        if(this.vitesseDroite = 1)
        {
            if(this.droite.x >= 50)
            {
                this.droite.setPosition(this.droite.x,this.droite.y-10)
            }
        }
        if(this.vitesseDroite = -1)
        {
            if(this.droite.x <= this.droite)
            {
                this.droite.setPosition(this.droite.x,this.droite.y+10)
            }
        }
    }
}
