(function(window) {
    function Promise(executor){
        this.status = 'pending'

        function resolve(value){}

        function reject(reason){

        }
        executor(resolve, reject)
    }
})()