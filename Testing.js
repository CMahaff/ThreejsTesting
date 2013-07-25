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
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    this.sphere = undefined;
    this.square = undefined;
    this.pointLight = undefined;
    this.change = 1;
};

Screen.prototype =
{
    constructor: Screen,

    create: function ()
    {
        this.scene.add(this.camera);
        this.camera.position.x = -300;
        this.camera.position.z = 0;
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
                        )
        this.scene.add(this.sphere);

        this.pointLight = new THREE.PointLight(0xFFFFFF);
        this.pointLight.position.x = -50;
        this.pointLight.position.y = 50;
        this.pointLight.position.z = 130;
        this.scene.add(this.pointLight);

        document.getElementById('webGLContainer').appendChild(this.renderer.domElement);
    },

    draw: function ()
    {
        this.renderer.render(this.scene, this.camera);
        
        if(Math.abs(this.camera.position.x) > 300)
        {
            this.change *= -1;
        }
        this.camera.position.x += this.change;
        this.camera.position.z = 300 * Math.cos(this.camera.position.x / 300 * Math.PI / 2) * this.change;
        console.log('x: ' + this.camera.position.x + ' z:' + this.camera.position.z);
        this.camera.lookAt(new THREE.Vector3(0,0,0));//remove new later
        
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
}