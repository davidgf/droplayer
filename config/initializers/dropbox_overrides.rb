require "dropbox_sdk"

class DropboxClient

    def get_file_chunk(from_path, size='10000', rev=nil)
        response = get_file_impl2(from_path, rev, size)
        Dropbox::parse_response(response, raw=true)
    end
    
    def get_file_impl2(from_path, rev=nil, size='1000') # :nodoc:
        headers = {'Range' => "bytes=0-#{size}"}
        path = "/files/#{@root}#{format_path(from_path)}"
        params = {
            'rev' => rev,
        }
        content_server = true
        @session.do_get2 path, params, headers, content_server
    end

    private :get_file_impl
end

class DropboxSessionBase

  def do_get2(path, params=nil, headers=nil, content_server=false)  # :nodoc:
    params ||= {}
    assert_authorized
    uri = build_url_with_params(path, params, content_server)
    req = Net::HTTP::Get.new(uri.request_uri)
    req.add_field(headers.keys[0], headers.values[0])
    do_http(uri, req)
  end

end