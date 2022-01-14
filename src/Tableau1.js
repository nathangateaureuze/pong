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

        this.haut = this.physics.add.image(0,0,"carre").setOrigin(0,0)
        this.haut.setDisplaySize(this.largeur,20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true)

        this.bas = this.physics.add.image(0,this.hauteur-20,"carre").setOrigin(0,0)
        this.bas.setDisplaySize(this.largeur,20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true)

        this.gauche = this.physics.add.image(0,this.hauteur/2,"carre").setOrigin(0,0)
        this.gauche.setDisplaySize(20,100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)
        this.physics.add.collider(this.gauche,this.haut)
        this.physics.add.collider(this.gauche,this.bas)

        this.droite = this.physics.add.image(this.largeur-20,this.hauteur/2,"carre").setOrigin(0,0)
        this.droite.setDisplaySize(20,100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)
        this.physics.add.collider(this.droite,this.haut)
        this.physics.add.collider(this.droite,this.bas)

        this.balle = this.physics.add.image(this.largeur/2,this.hauteur/2,"cercle").setOrigin(0,0)
        this.balle.setDisplaySize(20,20)
        this.balle.setBounce(1.5,1.5)
        this.balle.setVelocityX(100)
        this.balle.setVelocityY(100)
        this.balle.body.setMaxVelocityY(300)
        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.bas)
        this.physics.add.collider(this.balle,this.gauche)
        this.physics.add.collider(this.balle,this.droite)

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
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.vitesseGauche = -1
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.vitesseDroite = 1
                    console.log(me.vitesseDroite)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.vitesseDroite = -1
                    console.log(me.vitesseDroite)
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
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.vitesseGauche = 0
                    console.log(me.vitesseGauche)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.vitesseDroite = 0
                    console.log(me.vitesseDroite)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.vitesseDroite = 0
                    console.log(me.vitesseDroite)
                    break;
            }
        });
    }

    update()
    {

        /*
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
         */

        //déplacement des raquettes
        if(this.vitesseGauche === 1 && this.gauche.y>20)
        {
            this.gauche.setPosition(this.gauche.x,this.gauche.y-5)
        }
        if(this.vitesseGauche === -1 && this.gauche.y<this.hauteur-120)
        {
            console.log(this.gauche.y)
            this.gauche.setPosition(this.gauche.x,this.gauche.y+5)
        }

        if(this.vitesseDroite === 1 && this.droite.y>20)
        {
            this.droite.setPosition(this.droite.x,this.droite.y-5)
        }
        if(this.vitesseDroite === -1 && this.droite.y<this.hauteur-120)
        {
            this.droite.setPosition(this.droite.x,this.droite.y+5)

        }

        //sortie de balle
        if (this.balle.x <=0 || this.balle.x>=this.largeur)
        {
            this.balle.x = this.largeur/2
            this.balle.y = this.hauteur/2
            this.balle.setVelocityX(100)
            this.balle.setVelocityY(100)
        }
    }
}
