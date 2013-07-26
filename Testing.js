Screen = function ()
{
    this.WIDTH = 800;
    this.HEIGHT = 600;
    this.VIEW_ANGLE = 45;
    this.ASPECT = this.WIDTH / this.HEIGHT;
    this.NEAR = 0.1;
    this.FAR = 10000;
    this.camera = new THREE.PerspectiveCamera
                    (
                        this.VIEW_ANGLE,
                        this.ASPECT,
                        this.NEAR,
                        this.FAR
                    );
    this.canvas = document.getElementById('myCanvas');
    this.renderer = new THREE.WebGLRenderer
                        (
                            {canvas: this.canvas}
                        );
    this.scene = new THREE.Scene();
    this.sphere = undefined;
    this.cube = undefined;
    this.sun = undefined;
    this.pointLight = undefined;
    this.change = 1;
    this.centerVector = new THREE.Vector3(0,0,0);
    this.time = (new Date()).getTime();
    this.started = false;
};

Screen.prototype =
{
    constructor: Screen,

    create: function ()
    {
        this.scene.add(this.camera);
        this.camera.position.x = 0;
        this.camera.position.z = 150;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        var material = new THREE.MeshLambertMaterial(
                                    {
                                      color: 0xCC0000
                                    });
        this.sphere = new THREE.Mesh
                        (
                            new THREE.SphereGeometry
                                (
                                    50, //radius
                                    30, //segments
                                    30 //rings
                                ),
                            material
                        );
        this.scene.add(this.sphere);

        material = new THREE.MeshBasicMaterial(//no lighting
                                    {
                                      color: 0xFFCC33
                                    });
        this.sun = new THREE.Mesh
                        (
                            new THREE.SphereGeometry
                                (
                                    10, //radius
                                    30, //segments
                                    30 //rings
                                ),
                            material
                        );
        this.scene.add(this.sun);
        this.sun.position.x = -40;
        this.sun.position.y = 40;
        this.sun.position.z = 110;

        material = new THREE.MeshLambertMaterial(
                                    {
                                      color: 0xCC0000
                                    });
        this.cube = new THREE.Mesh
                        (
                            new THREE.CubeGeometry
                                (
                                    15, //width
                                    15, //height
                                    15 //depth
                                ),
                            material
                        );
        this.scene.add(this.cube);
        this.cube.position.y = 75;

        this.pointLight = new THREE.PointLight(0xFFFFFF);
        this.pointLight.position.x = -50;
        this.pointLight.position.y = 50;
        this.pointLight.position.z = 130;
        this.scene.add(this.pointLight);
    },

    draw: function ()
    {
        this.renderer.render(this.scene, this.camera);
        if((new Date()).getTime() - this.time > 3000) {
            if(!this.started)
            {
                this.camera.position.x = -300;
                this.camera.position.z = 0;
                this.started = true;
            }

            if(Math.abs(this.camera.position.x) > 300)
            {
                this.change *= -1;
            }
            this.camera.position.x += this.change;
            this.camera.position.z = 300 * Math.cos(this.camera.position.x / 300 * Math.PI / 2) * this.change;
            this.camera.lookAt(this.centerVector);
        }
        
    },

    move: function (e)
    {

        if(this.started)
        {
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 150;
            this.camera.lookAt(this.centerVector);
            this.started = false;
        }

        if(e.keyCode == 38)
        {
            this.camera.position.y++;
            e.preventDefault();
        }
        if(e.keyCode == 39)
        {
            this.camera.position.x++;
            e.preventDefault();
        }
        if(e.keyCode == 37)
        {
            this.camera.position.x--;
            e.preventDefault();
        }
        if(e.keyCode == 40)
        {
            this.camera.position.y--;
            e.preventDefault();
        }
        if(e.keyCode == 87)
        {
            this.camera.position.z--;
            e.preventDefault();
        }
        if(e.keyCode == 83)
        {
            this.camera.position.z++;
            e.preventDefault();
        }

        this.time = (new Date()).getTime();
    }

};

function init()
{
    var screen = new Screen();
    screen.create();
    //details on this setup: http://stackoverflow.com/questions/12101677/why-does-this-requestanimationframe-setup-fail-to-execute-properly
    //need to pass it a proper function
    requestAnimationFrame(function render(){
        screen.draw();
        requestAnimationFrame(render);
    });

    document.addEventListener('keydown', function listener(e){
        screen.move(e);
    }, 
    false);
}
