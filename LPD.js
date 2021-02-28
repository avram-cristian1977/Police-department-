$(document).ready(function () {
    function blink_text() {
        $('h3').fadeOut(500);
        $('h3').fadeIn(500);
    }
    setInterval(blink_text, 700);
    $('#neighbourhoods_btn').on("click", function () {
        $(".leichesterMap").hide();
        $(this).hide()

        function getNeighbourhoods() {

            $.ajax('https://data.police.uk/api/leicestershire/neighbourhoods', {
                success: function (neighbourhoods) {
                    console.log(neighbourhoods)

                    $('#neighbourhoods_container').empty()
                    $('#neighbourhoods_container').append(`<h2 > Leichester Police Department Station </h2>`)
                    $.each(neighbourhoods, function (index, value) {
                        $('.neighbourhoods_container').append(`
                        <div class="neighbourhood_name"> Neighbourhood name : 
                        <span class="neighbourhoodsName"> ${value.name} </span></div>
                        <button class="neighbourhood_team_btn" data-id="${value.id}"> Show Assigned Patrol </button>
                        <hr>
                        `)
                    })
                }
            })
        }
        getNeighbourhoods()
    });

    $(document).on('click', '.neighbourhood_team_btn', function () {

        var id = $(this).data('id');
        $('h5').hide()
        $('h1').after(`<h5>Reporting on duty:</h5>`);
        $.ajax('https://data.police.uk/api/leicestershire/' + id + '/people', {
            success: function (patrol) {
                console.log(patrol)

                $('p').empty()

                $.each(patrol, function (index, value) {

                    $('p').append(`
                        <div class="patrol_names"> Officer name : ${value.name}  </div>
                        `)
                })
            }
        });
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });




});